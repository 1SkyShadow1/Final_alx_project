const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/gigs', async(req, res)=>{
  try{
    // Aquire skills from query parameters
    const {skills} = req.query;
    const userId = req.userId;
    let query = 'SELECT * FROM gigs';

    if(skills){
      const skillIds = skills.split(',');
      query += 'WHERE JSON_CONTAINS(skill_required, JSON_ARRAY(${skillIds.join(',')}))';
      const[rows] = await db.execute(query, [userId]);
      res.json(rows);
    } else {
      query = 'SELECT * FROM gigs WHERE JSON_CONTAINS(skill_required, JSON_ARRAY(?))';
      const[rows] = await db.execute(query, [userId]);
      res.json(rows);   
    }
  } catch (error){
    console.error('Error getting gigs:', error);
    res.status(500).json({message:'Error fetching gigs'});
  }   
});

router.post('/gigs', async(req, res)=>{
  try{
    const {title, description, skills_required, userId} = req.body;
    const[result] = await db.execute(
      'INSERT INTO gigs (title, description, skills_required, user_id)VALUES(?,?,?,?)',
      [title, description, skills_required, userId]     
    );

    res.status(201).json({message:'Gig created successfully'});
  } catch (error){
    console.error('Error creating gig:', error);
    res.status(500).json({message: 'Error creating gig'});
  }
});

//Submission of a gig application

router.post('/:gigId/apply', async(req, res)=>{
 try {
  const {gigId} = req.params;
  const userId = req.userId;
  const {applicationText} = req.body;
  
  const [result] = await db.execute(
    'INSERT INTO gig_applications (gig_id, user_id, application_text)VALUES(?,?,?)',
    [gigId,userId, applicationText]
  );

  const[gigPoster] = await db.execute(
    'SELECT u.username, g.title FROM gigs g JOIN users u ON g.user_id = u.id WHERE g.id = ?',
    [gigId]  
  );

  const [notificationResult] = await db.execute(
    'INSERT INTO notifications (user_id, notification_type, message)VALUEs(?,?,?)',
    [gigPoster[0].user_id, 'new_gig_application', `You have a new application for your gig"${gigPoster[0].title}"`]
  );

  res.status(201).json({message: 'Error submitting gig application'});
 } catch (error){
   console.error('Error submitting gig application:', error);
   res.status(500).json({message: 'Error submitting gig application'});
 } 
});

// Getting an application for a specific gig
router.get('/:gigId/applications', async(req, res) =>{
  try{
    const {gigId} = req.params;
    const userId = req.userId;
    
    const [rows] = await db.execute(
      'SELECT ga.*, u.username FROM gig_applications ga JOIN users u ON ga.user_id = u.id WHERE ga.gig_id = ? AND ga.user_id = ?',
      [gigId, userId]
    );
    res.json(rows);
  } catch (error){
    console.error('Error fetching gig applications:', error);
    res.status(500).json({message:'Error fetching gig applications'});
  }
});

// route to accept a gig application
router.put('/:gigId/applications/:applicationId/accept', async (req, res) =>{
  try{
    const {gigId, applicationId} = req.params;
    const userId = req.userId;

    // checking if gig belongs to current user
    const[gig] = await db.execute(
      'SELECT 1 FROM gigs WHERE id = ? AND user_id = ?',
      [gigId, userId]    
    );
    
    if(gig.length === 0){
      return res.status(403).json({message:'Unauthorized'});      
    }

    // get applicant's user name
    const[applicant] = await db.execute(
      'SELECT u.username, g.title FROM gig_applications ga JSON users u ON ga.user_id = u.id JOIN  g ON ga.gig_id = g.id WHERE ga.id = ?',
      [applicationId]      
    );

    // Updating application status
    const [result] = await db.execute(
      'UPDATE gig_applications SET status = "accepted" WHERE id = ?',
      [applicationId]
    );

    if(result.affectedRows === 0){
      return res.status(404).json({message: 'Application not sound'});    
    }

    // creating notification for applicant
    const [notificationResult] = await db.execute(
      'INSERT INTO notifications( user_id, notification_type, message)VALUES(?,?,?)',
      [applicant[0].user_id, 'gig_accepted', `Your application for gig "${applicant[0].title}" has been accepted!`] 
    );

    res.json({message: 'Application accepted successfully'});
  } catch (error){
    console.error('Error accepting application', error);
    res.sendStatus(500).json({message:'Error accepting application'});
  }
});

// route used to reject a gig application
router.put('/:gigId/applications/:applicationId/reject', async(req,res) => {
  try {
    const {gigId, applicationId} = req.params;
    const userId = req.userId;
   
    // Does gig belong to current user ??
    const[gig] = await db.execute(
      'SELECT 1 FROM gigs WHERE id = ? AND user_id =?',
      [gigId, userId]    
    );

    if(gig.length === 0){
      return res.status(403).json({message: 'Unauthorized'});    
    }

    // get applicant's username during notification
    const[applicant] = await db.execute(
      'SELECT u.username, g.title FROM gig_applications ga JOIN users u ON ga.user_id = u.id JOIN gigs g ON ga.gig_id = g.id WHERE ga.id = ?',
      [applicationId]
    );

    // updating application status to rejected
    const[result] = await db.execute(
      'UPDATE gig_appliations SET status = "rejected" where id = ?',
      [applicationId]    
    );

    if(result.affectedRows === 0){
     return res.status(404).json({message:'Application not found'});   
    }

    // creating notification for applicant
    const[notificationResult] = await db.execute(
      'INSERT INTO notification (user_id, notification_type, message)VALUES(?,?,?)',
      [applicant[0].user_id, 'gig_rejected', `Your application for gig "${applicant[0].title}" has been rejected`]    
    );

    res.json({message:'Application rejected successfully'});

  } catch (error){
    console.error('Error rejecting application:', error);
    res.status(500).json({message: 'Error rejecting application'});
  }
});
  // route to contact an applicant by sending a message
  router.post('/:gigId/applications/:applicationId/contact', async(req, res) =>{
    try{
      const {gigId, applicationId} = req.params;
      const userId = req.userId;
      const {messageText} = req.body;
      
      //checking if the gig belongs to the current user
        const[gig] = await db.execute(
          'SELECT 1 FROM gigs WHERE id = ? AND user_id = ?',
          [gigId, userId]    
        );

        if(gig.length === 0){
          return res.status(403).json({message:'Unauthorized'});    
        }

        // used to find applicant's ID
        const[application] = await db.execute(
          'SELECT user_id FROM gig_applications WHERE id = ?',
          [applicationId] 
        );
        if(application.length === 0){
          return res.status(404).json({message:'Application not found'});    
        }
        const applicantId = application[0].user_id;
        
        // sends message using message API route
        const [result] = await db.execute(
          'INSERT INTO messages (sender_id, receiver_id, message_text)VALUES(?,?,?)',
          [userId, applicantId, messageText]
        );

        res.json({message:'Message sent successfully'});
    } catch(error) {
      console.error('Error contacting', error);
      res.status(500).json({message:'Error contacting applicant'});   }
  });



module.exports = router;