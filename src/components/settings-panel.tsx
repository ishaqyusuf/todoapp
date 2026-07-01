import { useState } from "react";
import { InputGroupButton } from "./ui/input-group";
import constants from "@/lib/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import PersonalSettings from "./settings-personal";
import PasswordSettings from "./settings-password";
export default function SettingsPannel() {
  const settingsButtons = constants.settingsButtons;
  const [showSettingsContent, setShowSettingsContent] = useState("");
  const activeSettingsButtons = settingsButtons.find(
    (item) => item.id == showSettingsContent,
  );
  return (
    <>
      <Tabs className="" orientation="vertical">
        <TabsList className="dark:bg-gray-700 ">
          {settingsButtons.map((items, index) => {
            return (
              <TabsTrigger key={items.id} value={items.id}>
                {items.title}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {settingsButtons.map((items) => {
          return (
            <TabsContent
              key={items.id}
              value={items.id}
              className="dark:bg-gray-700 "
            >
              <Card className="h-80 dark:bg-gray-700 p-2 border-none shadow-none">
                <CardHeader>
                  <CardTitle className="text-left -ml-7">
                    {items.title}
                  </CardTitle>
                </CardHeader>

                <CardDescription>
                  {items.title === "Personal" && <PersonalSettings />}
                  {items.title === "Password" && <PasswordSettings />}
                </CardDescription>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>
    </>
  );
}
