
import React, { useState } from 'react';
import { Check, ChevronsUpDown, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { availableLocations } from '@/utils/airQualityData';

interface LocationSelectorProps {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
}

const LocationSelector = ({ selectedLocation, onLocationChange }: LocationSelectorProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center">
      <MapPin className="mr-2 h-5 w-5 flex-shrink-0 text-muted-foreground" />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-white/50 backdrop-blur-sm"
          >
            <span className="truncate">{selectedLocation}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search location..." />
            <CommandList>
              <CommandEmpty>No location found.</CommandEmpty>
              <CommandGroup>
                {availableLocations.map((location) => (
                  <CommandItem
                    key={location}
                    value={location}
                    onSelect={() => {
                      onLocationChange(location);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedLocation === location ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {location}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default LocationSelector;
