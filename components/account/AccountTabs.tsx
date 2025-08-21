'use client';
// import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, CreditCard, Shield } from "lucide-react";
// import { UserData } from "@/interfaces/documents";
import AccountForm from "./AccountForm";

export interface AccountTabsProps {
  // userData: UserData;
  name: string;
  phone: string;
  language: string;
  gender: string;
  assistant: string;

}

export default function AccountTabs({ name, phone, language, gender, assistant }: AccountTabsProps) {
  return (
    <Tabs defaultValue="account" className="max-w-[800px] mx-auto">
      <TabsList className="grid w-full grid-cols-3 rounded-xl h-10 bg-transparent">
        <TabsTrigger
          value="account"
          className="rounded-lg py-2 data-[state=active]:text-main"
        >
          <User size={20} className="sm:mr-2" />
          <span className="hidden sm:inline">Account</span>
        </TabsTrigger>
        <TabsTrigger
          value="billing"
          className="rounded-lg py-2 data-[state=active]:text-main"
        >
          <CreditCard size={20} className="mr-2" />
          <span className="hidden sm:inline">Billing</span>
        </TabsTrigger>
        <TabsTrigger
          value="privacy"
          className="rounded-lg py-2 data-[state=active]:text-main"
        >
          <Shield size={20} className="mr-2" />
          <span className="hidden sm:inline">Privacy</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle className="text-main">Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you&apos;re
              done.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-2">
            {/* <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div> */}

            <AccountForm {...{ name, phone, language, gender, assistant }} />
          </CardContent>

          {/* <CardFooter>
            CardFooter
          </CardFooter> */}
        </Card>
      </TabsContent>

      <TabsContent value="billing">
        <Card>
          <CardHeader>
            <CardTitle className="text-main">Billing</CardTitle>
            Coming soon...
            {/* <CardDescription>Change your billing info here.</CardDescription> */}
          </CardHeader>
          {/* <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current card number</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New card number</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save card number</Button>
          </CardFooter> */}
        </Card>
      </TabsContent>

      <TabsContent value="privacy">
        <Card>
          <CardHeader>
            <CardTitle className="text-main">Privacy</CardTitle>
            Coming soon...
          </CardHeader>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
