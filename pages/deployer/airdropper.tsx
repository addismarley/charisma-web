import Image from "next/image"
import { Button } from "@components/ui/button"
import Layout from "@components/layout"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form"
import { Input } from "@components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { userSession } from '@components/stacks-session/connect';
import { useConnect } from "@stacks/connect-react"
import { StacksMainnet } from "@stacks/network";
import { PostConditionMode } from "@stacks/transactions"
import { useEffect } from "react"

const generateTemplate = () => {
    return `(contract-call? 'SP2ZNGJ85ENDY6QRHQ5P2D4FXKGZWCKTB2T0Z55KS.quiet-confidence send-many (list 
    {to: 'SP3KVRE3RDYYSJ3JDGXKA0K15CC4JEA2ZGX4TJ5EC, amount: u50000000, memo: none}
    {to: 'SP1KD2BS98HCAEZQB3A4AXNS2KNAFTXF2CTJBQWF6, amount: u50000000, memo: none}
    {to: 'SP24ANEK96Y51TT99FBCG3PZKMESBQ5G4YZXK1T5K, amount: u50000000, memo: none}
    {to: 'SP1MHDS2YAGCN0BJ0GCDSKCXB099PJM3B91HSAH4X, amount: u50000000, memo: none}
    {to: 'SP15JMFZY4S59PTKHB399KE78ST5CHEYE2S0NCBNM, amount: u50000000, memo: none}
    {to: 'SP10MJMD78XV08EK1A9BWV9CGZZCAB7XTXQFZ9PMN, amount: u50000000, memo: none}
    {to: 'SPJNGNX5RBR9RDWWANG1AJ6A5RJKXMY32M0YK4SD, amount: u50000000, memo: none}
    {to: 'SP1JMRR3FXT05E5028MJGQJR4BAJ1TWA2NWX79HVF, amount: u50000000, memo: none}
    {to: 'SP3GTH5A9HBMYAQQ8GA7S9RTD8BRAAFXPQT7JM2HD, amount: u50000000, memo: none}
    {to: 'SP1G4T6NPY775YMGGEFCF2ZH06EFWFC4FHZX7CG2K, amount: u50000000, memo: none}
    {to: 'SPJYAPKCEDJSHMAJFHZ1BQDY6ZGQZBRSWMXE2TT5, amount: u50000000, memo: none}
    {to: 'SP1EMXT9RET8W5TXQ325BG3TJ6X15NXV5GKEGVQE6, amount: u50000000, memo: none}
    {to: 'SP3NJE41Q9QAVCRJBYZNTQRGEQKF9JJGTPBQYM3Q8, amount: u50000000, memo: none}
    {to: 'SP1WCJ02AAPKMXPK81KFKGJ7MJDET11FPQG1RHB0S, amount: u50000000, memo: none}
    {to: 'SPH3B94CKKN8G3C7YJJE6WA5AMBJ3PK3R91K00YR, amount: u50000000, memo: none}
    {to: 'SP1VR0DTVA9G1VAV0MPER2C6XNR3NSA7917MZZBAQ, amount: u50000000, memo: none}
    {to: 'SPWRJ6AQRYR8E68GS8XP3TGM33FBA898E08PM1MD, amount: u50000000, memo: none}
    {to: 'SP2A7E3EZ600AJM63FTD3TNS6DY2CB2XGDSKSW226, amount: u50000000, memo: none}
    {to: 'SP3PXGVQ24DSRAB3059JDARZDKX1ZJ2QS62GVJNQW, amount: u50000000, memo: none}
    {to: 'SP2J6Y09JMFWWZCT4VJX0BA5W7A9HZP5EX96Y6VZY, amount: u50000000, memo: none}
    {to: 'SP19NPW1QYFAVJ4DFY9C29X9MMVD1RA3SGK033EZ8, amount: u50000000, memo: none}
    {to: 'SP1E84PGKP9JR14KMK025CNXX6WD7G19N6V24GATW, amount: u50000000, memo: none}
    {to: 'SP3M3Y5W82QV4S05CNMWXGKZER5YEVSRD7JXVWBBZ, amount: u50000000, memo: none}
    {to: 'SP27AV8K8ZP7JJ1PTCFJG6T16708Q3CR63VTAKFAJ, amount: u50000000, memo: none}
    {to: 'SP24SBJMZYS9FWKQZVVDZGM595EYGRT6368ND7MEA, amount: u50000000, memo: none}
    {to: 'SP3MYZ2T7JA4GYBYMSZ4ZJYEYTZ69JDD0M7W4BQ8V, amount: u50000000, memo: none}
    {to: 'SP37W6CK0YZ1KJXGFM57Z7VY48T6VFKCQYKQ929NP, amount: u50000000, memo: none}
    {to: 'SP1JK28ST2PQRFEV7VSR5E23Q1TSR9HRBVY1D5MSV, amount: u50000000, memo: none}
    {to: 'SPE9WQ40J321GWQVSVSCK2HSF024HSP8A97P62H9, amount: u50000000, memo: none}
    {to: 'SPBC5CXC2KMBYEQJX5ANRZ7JBYQJZZQ8JN2HZ20X, amount: u50000000, memo: none}
    {to: 'SPBF4ATK04KX5M9ZTT97HVK8SWT1X5DQVCZ3TC04, amount: u50000000, memo: none}
    {to: 'SP12C2285NTBNZH38SAAPVBDCQMWT2J2SYKC1KDC3, amount: u50000000, memo: none}
    {to: 'SP1F3GP5V3S7BCDXZAJKY7WAVQPD78PF3MV7W3QT4, amount: u50000000, memo: none}
    {to: 'SP2M035JP83SEJ2QEMZMWVT05E6KJS5RV86MGCZ9F, amount: u50000000, memo: none}
    {to: 'SP870RFTKDBMC8WJ9CE89ZKVEJBGF57ZAV3T87Z1, amount: u50000000, memo: none}
    {to: 'SP3D1WBA1P9JR8DTJY8QM2XXRQR99Q5EN8E8Y43C, amount: u50000000, memo: none}
    {to: 'SPKZT8CFR5DNTKDR2BCWQA9WR32GP3GT0CPV8V24, amount: u50000000, memo: none}
    {to: 'SP3PDFVMBMDH4WVEMEAPTH68A9H4Q4F1XE56V52XC, amount: u50000000, memo: none}
    {to: 'SP2ZMHZE792DEC1196H5TQBKXEHP33BBJR2WC1Q0V, amount: u50000000, memo: none}
    {to: 'SP3BBYY3ZWWFVHHSNN97FP51CH1M8Y1D5EGGXCQXP, amount: u50000000, memo: none}
    {to: 'SP3VMAHTFVN9ED5FB073MK1B8MGNCZW5VCEHFFD7C, amount: u50000000, memo: none}
    {to: 'SP3CGBHFXFNQMDVWVKWRPK9KBTS60Y7CPEH2ESFMB, amount: u50000000, memo: none}
))
`
}


export default function AirdropTemplate({ onFormChange }: any) {

    useEffect(() => {
        onFormChange(generateTemplate())
    }, [])


    return (
        <></>
    )
}