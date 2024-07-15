"use client";

import { Card, CardContent } from "@/app/ui/card";
import { Button } from "@/app/ui/button";
import Badge from "@/app/ui/badge";
import { DollarSignIcon } from "@/app/icons/dollar-sign";
import { MapPinIcon } from "@/app/icons/map-pin";

interface GigProps {
  gig: {
    title: string;
    description: string;
    location: string;
    pay: string;
    category: string;
  };
}

const GigCard = ({ gig }: GigProps) => {
  return (
    <Card className={undefined}>
      <CardContent className="grid grid-cols-[1fr_auto] gap-4">
        <div>
          <h3 className="text-lg font-bold">{gig.title}</h3>
          <p className="text-muted-foreground">{gig.description}</p>
          <div className="flex items-center gap-2 text-sm">
            <MapPinIcon className="w-4 h-4" />
            <span>{gig.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <DollarSignIcon className="w-4 h-4" />
            <span>{gig.pay}/hr</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge variant="outline" className={undefined}>{gig.category}</Badge>
          <Button variant="outline" className={undefined}>Apply</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { GigCard };