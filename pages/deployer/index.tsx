import {
    Bird,
    Book,
    Bot,
    Code2,
    Coins,
    CornerDownLeft,
    LifeBuoy,
    Mic,
    Paperclip,
    Plane,
    Rabbit,
    Scale,
    Send,
    Settings,
    Settings2,
    Share,
    SquareTerminal,
    SquareUser,
    Triangle,
    Turtle,
} from "lucide-react"
import { Badge } from "@components/ui/badge"
import { Button } from "@components/ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@components/ui/drawer"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select"
import { Textarea } from "@components/ui/textarea"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@components/ui/tooltip"
import Layout from "@components/layout"
import AirdropTemplate from "./airdropper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { useEffect, useState } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form"
import { motion } from 'framer-motion';
import { template } from "lodash"
import IndexTokenTemplate from "./index-token"


const generateHeader = ({ name, sender, description }: any) => {
    return `;; Title: ${name}
;; Author: ${sender}
;; Created With Charisma
;; Description:
;; ${description}

`}

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

const contractFormSchema = z.object({
    template: z.string(),
    name: z.string(),
    description: z.string(),
})

type ContractFormValues = z.infer<typeof contractFormSchema>

export default function ContractDeployer() {

    const [loading, setLoading] = useState(true);

    const [contractConfig, setContractConfig] = useState<any>({
        template: 'proposal',
        header: generateHeader({}),
        airdrop: '',
        proposal: '',
        token: ''
    })

    useEffect(() => {
        setLoading(false);
    }, []);

    const defaultValues: Partial<ContractFormValues> = {
        template: 'proposal'
    }

    const form = useForm<ContractFormValues>({
        resolver: zodResolver(contractFormSchema),
        defaultValues,
        mode: "onChange",
    })

    const handleTemplateChange = (value: string) => {
        setContractConfig({ ...contractConfig, template: value })
    };

    const handleContractChange = (template: string) => {
        setContractConfig({ ...contractConfig, [contractConfig.template]: template })
    }

    const handleHeaderChange = () => {
        setContractConfig({ ...contractConfig, header: generateHeader(form.getValues()) })
    }



    return (
        <Layout>
            <div className="grid w-full">
                <Form {...form}>
                    <form onChange={handleHeaderChange}>
                        <div className="flex flex-col">
                            <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
                                <h1 className="text-xl font-semibold">Contract Deployer</h1>
                                <Drawer>
                                    <DrawerTrigger asChild>
                                        <Button variant="ghost" size="icon" className="md:hidden">
                                            <Settings className="size-4" />
                                            <span className="sr-only">Settings</span>
                                        </Button>
                                    </DrawerTrigger>
                                    <DrawerContent className="max-h-[80vh]">
                                        <DrawerHeader>
                                            <DrawerTitle>Configuration</DrawerTitle>
                                            <DrawerDescription>
                                                Configure the settings for the model and messages.
                                            </DrawerDescription>
                                        </DrawerHeader>
                                        <div className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
                                            <fieldset className="grid gap-6 rounded-lg border p-4">
                                                <legend className="-ml-1 px-1 text-sm font-medium">
                                                    Configuration
                                                </legend>
                                                <div className="grid gap-3">
                                                    <Label htmlFor="model">Contract Template</Label>
                                                    <Select>
                                                        <SelectTrigger
                                                            id="model"
                                                            className="items-start [&_[data-description]]:hidden"
                                                        >
                                                            <SelectValue placeholder="Select a model" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="genesis">
                                                                <div className="flex items-start gap-3 text-foreground">
                                                                    <Scale className="size-5" />
                                                                    <div className="grid gap-0.5">
                                                                        <p>
                                                                            Governance{" "}
                                                                            <span className="font-medium text-foreground">
                                                                                Proposal
                                                                            </span>
                                                                        </p>
                                                                        <p className="text-xs" data-description>
                                                                            Deploy a new governance proposal.
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </SelectItem>
                                                            <SelectItem value="explorer">
                                                                <div className="flex items-start gap-3 text-foreground">
                                                                    <Send className="size-5" />
                                                                    <div className="grid gap-0.5">
                                                                        <p>
                                                                            Token{" "}
                                                                            <span className="font-medium text-foreground">
                                                                                Airdropper
                                                                            </span>
                                                                        </p>
                                                                        <p className="text-xs" data-description>
                                                                            Distribute tokens to multiple addresses.
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </SelectItem>
                                                            <SelectItem value="quantum">
                                                                <div className="flex items-start gap-3 text-foreground">
                                                                    <Coins className="size-5" />
                                                                    <div className="grid gap-0.5">
                                                                        <p>
                                                                            Create{" "}
                                                                            <span className="font-medium text-foreground">
                                                                                Index Token
                                                                            </span>
                                                                        </p>
                                                                        <p className="text-xs" data-description>
                                                                            Create a new Charisma index token.
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </DrawerContent>
                                </Drawer>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="ml-auto gap-1.5 text-sm"
                                >
                                    <Share className="size-3.5" />
                                    Share
                                </Button>
                            </header>
                            <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
                                <div
                                    className="relative hidden flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0"
                                >
                                    <div className="grid w-full items-start gap-6">
                                        <fieldset className="grid gap-6 rounded-lg border p-4">
                                            <legend className="-ml-1 px-1 text-sm font-medium">
                                                Configuration
                                            </legend>
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="template"
                                                    render={({ field }) => (
                                                        <FormItem className="w-full">
                                                            <FormLabel>Contract Template</FormLabel>
                                                            <FormControl>
                                                                <Select onValueChange={handleTemplateChange} defaultValue={field.value}>
                                                                    <SelectTrigger
                                                                        id="model"
                                                                        className="items-start [&_[data-description]]:hidden"
                                                                    >
                                                                        <SelectValue placeholder="Select a model" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="proposal">
                                                                            <div className="flex items-start gap-3 text-foreground">
                                                                                <Scale className="size-5" />
                                                                                <div className="grid gap-0.5">
                                                                                    <p>
                                                                                        Governance{" "}
                                                                                        <span className="font-medium text-foreground">
                                                                                            Proposal
                                                                                        </span>
                                                                                    </p>
                                                                                    <p className="text-xs" data-description>
                                                                                        Deploy a new governance proposal.
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </SelectItem>
                                                                        <SelectItem value="airdrop">
                                                                            <div className="flex items-start gap-3 text-foreground">
                                                                                <Send className="size-5" />
                                                                                <div className="grid gap-0.5">
                                                                                    <p>
                                                                                        Token{" "}
                                                                                        <span className="font-medium text-foreground">
                                                                                            Airdropper
                                                                                        </span>
                                                                                    </p>
                                                                                    <p className="text-xs" data-description>
                                                                                        Distribute tokens to multiple addresses.
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </SelectItem>
                                                                        <SelectItem value="index">
                                                                            <div className="flex items-start gap-3 text-foreground">
                                                                                <Coins className="size-5" />
                                                                                <div className="grid gap-0.5">
                                                                                    <p>
                                                                                        Create{" "}
                                                                                        <span className="font-medium text-foreground">
                                                                                            Index Token
                                                                                        </span>
                                                                                    </p>
                                                                                    <p className="text-xs" data-description>
                                                                                        Create a new Charisma index token.
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </fieldset>
                                        <fieldset className="grid grid-cols-1 gap-4 rounded-lg border p-4">
                                            <legend className="-ml-1 px-1 text-sm font-medium">
                                                Airdrop Template
                                            </legend>
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem className="w-full">
                                                        <FormLabel>Contract Name</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder={'For The Homies'} {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="description"
                                                render={({ field }) => (
                                                    <FormItem className="w-full">
                                                        <FormLabel>Description</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder={'To reward all the homies for their valor against all odds.'} {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </fieldset>
                                        {!loading && <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                                            {contractConfig.template === 'airdrop' ?
                                                <AirdropTemplate onFormChange={handleContractChange} />
                                                : contractConfig.template === 'index' ?
                                                    <IndexTokenTemplate onFormChange={handleContractChange} />
                                                    : null
                                                // <ProposalTemplate onFormChange={handleContractChange} />
                                                // : contractConfig.template === 'airdrop' ?

                                            }
                                        </motion.div>}
                                    </div>
                                </div>
                                <div className="relative flex h-full bg-black flex-col rounded-lg bg-muted/5 lg:col-span-2 overflow-hidden border m-3">
                                    <Badge variant="outline" className="absolute right-3 top-3">
                                        Output
                                    </Badge>
                                    <SyntaxHighlighter language="lisp" customStyle={{ background: 'black', height: '100%' }} wrapLongLines={true}>
                                        {String(contractConfig.header) + String(contractConfig[contractConfig.template])}
                                    </SyntaxHighlighter>
                                    {/* <div
                                        className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring" x-chunk="dashboard-03-chunk-1"
                                    >
                                        <Label htmlFor="message" className="sr-only">
                                            Message
                                        </Label>
                                        <Textarea
                                            id="message"
                                            placeholder="Type your message here..."
                                            className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                                        />
                                        <div className="flex items-center p-3 pt-0">
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <Paperclip className="size-4" />
                                                            <span className="sr-only">Attach file</span>
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent side="top">Attach File</TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <Mic className="size-4" />
                                                            <span className="sr-only">Use Microphone</span>
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent side="top">Use Microphone</TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                            <Button type="submit" size="sm" className="ml-auto gap-1.5">
                                                Send Message
                                                <CornerDownLeft className="size-3.5" />
                                            </Button>
                                        </div>
                                    </div> */}
                                </div>
                            </main>
                        </div>
                    </form>
                </Form>
            </div>
        </Layout>
    )
}


// on finish index deploy
//
// async (resp) => {
//     const baseTokenSymbolA = await getSymbol(baseTokenA)
//     const baseTokenSymbolB = await getSymbol(baseTokenB)
//     const baseTokenSourceA = await getContractSource({ contractAddress: baseTokenA.split('.')[0], contractName: baseTokenA.split('.')[1] })
//     const baseTokenSourceB = await getContractSource({ contractAddress: baseTokenB.split('.')[0], contractName: baseTokenB.split('.')[1] })
//     // find the string that comes after the first occurence of 'define-fungible-token' in the baseTokenSourceA.source string
//     const baseTokenFtA = baseTokenSourceA.source.split('define-fungible-token')[1].split('\n')[0].replace(')', '').trim()
//     const baseTokenFtB = baseTokenSourceB.source.split('define-fungible-token')[1].split('\n')[0].replace(')', '').trim()

//     // todo: this might be a good time to scan the source code with AI for malicious code or vulnerabilities

//     const response = await setContractMetadata(ca, {
//         name: name,
//         description: description,
//         image: image,
//         background: background,
//         symbol: ticker,
//         ft: "index-token",
//         weight: indexTokenRatio,
//         contains: [
//             {
//                 address: baseTokenA,
//                 symbol: baseTokenSymbolA,
//                 ft: baseTokenFtA,
//                 weight: tokenARatio
//             },
//             {
//                 address: baseTokenB,
//                 symbol: baseTokenSymbolB,
//                 ft: baseTokenFtB,
//                 weight: tokenBRatio
//             }
//         ]

//     })
//     console.log(response)
// }

// other stuffs
//
// const safeName = name.toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/\s+/g, "-")
// const safeTicker = ticker.replace(/[^a-zA-Z ]/g, "").replace(/\s+/g, "-")
// const ca = `${sender}.${safeName}`