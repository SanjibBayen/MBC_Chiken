'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';
import { CONTACT_EMAIL, CONTACT_PHONE, SHOP_ADDRESS } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';


const contactSchema = z.object({
    name: z.string().min(2, "Name is required."),
    email: z.string().email("Invalid email address."),
    message: z.string().min(10, "Message must be at least 10 characters long."),
});

export default function ContactPage() {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof contactSchema>>({
        resolver: zodResolver(contactSchema),
    });

    function onSubmit(values: z.infer<typeof contactSchema>) {
        console.log(values);
        toast({
            title: "Message Sent!",
            description: "Thank you for contacting us. We will get back to you shortly.",
        });
        form.reset({name: "", email: "", message: ""});
    }

    return (
        <div>
            <section className="relative w-full py-20 md:py-32 bg-secondary/50">
                <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary tracking-tight">
                    Get In Touch
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
                    We'd love to hear from you! Whether you have a question, feedback, or a special request, our team is here to help.
                </p>
                </div>
            </section>
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
                    <div>
                         <Card>
                            <CardHeader>
                                <CardTitle>Send us a Message</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Your Name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="your.email@example.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="message"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Message</FormLabel>
                                                    <FormControl>
                                                        <Textarea placeholder="How can we help you?" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" disabled={form.formState.isSubmitting}>
                                            {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                                        </Button>
                                    </form>
                                </Form>
                            </CardContent>
                         </Card>
                    </div>
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold font-headline">Contact Information</h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <MapPin className="h-6 w-6 text-primary mt-1" />
                                <div>
                                    <h3 className="font-semibold">Our Address</h3>
                                    <p className="text-muted-foreground">{SHOP_ADDRESS}</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-4">
                                <Phone className="h-6 w-6 text-primary mt-1" />
                                <div>
                                    <h3 className="font-semibold">Phone Number</h3>
                                    <a href={`tel:${CONTACT_PHONE}`} className="text-muted-foreground hover:text-primary">{CONTACT_PHONE}</a>
                                </div>
                            </div>
                             <div className="flex items-start gap-4">
                                <Mail className="h-6 w-6 text-primary mt-1" />
                                <div>
                                    <h3 className="font-semibold">Email Address</h3>
                                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-muted-foreground hover:text-primary">{CONTACT_EMAIL}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
