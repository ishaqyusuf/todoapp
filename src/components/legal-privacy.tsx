import { useState } from "react";
import { InputGroupButton } from "./ui/input-group";
import constants from "@/lib/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
export default function LegalPrivacy() {
  const legalButtons = constants.legalButtons;
  const [showLegalContent, setShowLegalContent] = useState("");
  const activeLegalButtons = legalButtons.find(
    (item) => item.id == showLegalContent,
  );
  return (
    <Tabs className="" orientation="vertical">
      <TabsList className="dark:bg-gray-700 ">
        {legalButtons.map((items, index) => {
          return (
            <TabsTrigger key={items.id} value={items.id}>
              {items.title}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {legalButtons.map((items) => {
        return (
          <TabsContent
            key={items.id}
            value={items.id}
            className="dark:bg-gray-700 "
          >
            <Card className="h-100 dark:bg-gray-700 p-2 border-none shadow-none">
              <CardHeader>
                <CardTitle>{items.title}</CardTitle>
              </CardHeader>

              <CardDescription>{items.content}</CardDescription>
            </Card>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
