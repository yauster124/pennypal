"use client";

import { Card, CardContent } from "@/components/ui/card"
import { Resolver, useForm } from "react-hook-form";
import { UpdateProfileInput, updateProfileInputSchema, useUpdateProfile } from "../api/update-profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/types/api";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const ProfileSettings = ({
    user
}: {
    user: User
}) => {
    const updateProfile = useUpdateProfile();
    const form = useForm<UpdateProfileInput>({
        resolver: zodResolver(updateProfileInputSchema) as Resolver<UpdateProfileInput>,
        defaultValues: {
            profilePictureUrl: user.profilePictureUrl,
            username: user.alias
        }
    });

    return (
        <Card>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={
                            form.handleSubmit((values) => {
                                updateProfile.mutate({
                                    data: values
                                });
                                form.reset();
                            })
                        }
                        className="space-y-8"
                    >
                        <div className="flex flex-col gap-2">
                            <div className="inline-flex items-center gap-2 align-top">
                                <Avatar className="relative flex size-8 shrink-0 overflow-hidden rounded-full h-20 w-20">
                                    <AvatarImage src={user.profilePictureUrl} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <FormField
                                    control={form.control}
                                    name="profilePictureUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                            {updateProfile.isPending ? (
                                <Button disabled>
                                    <Loader2Icon className="animate-spin" />
                                    Please wait
                                </Button>
                            ) : (
                                <Button type="submit">Save</Button>
                            )}
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export const ProfileSettingsSkeleton = () => {
    return (
        <Card>
            <CardContent>
                <div className="space-y-8">
                    <div className="flex flex-col gap-2">
                        <div className="inline-flex items-center gap-2 align-top">
                            <Skeleton className="relative flex size-8 shrink-0 overflow-hidden rounded-full h-20 w-20" />
                            <Skeleton className="h-6 w-[200px]" />
                        </div>
                    </div>
                    <Skeleton className="h-6 w-[100px]" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-[240px]" />
                    <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                        <Skeleton />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}