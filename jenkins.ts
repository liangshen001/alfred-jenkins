import alfred from "@liangshen/alfred";
import Jenkins from "@liangshen/jenkins";

const protocol = alfred.env.get('protocol')! as 'http' | 'https';
const port = +alfred.env.get('port')!;
const host = alfred.env.get('host')!;
const username = alfred.env.get('username')!;
const password = alfred.env.get('password')!;

export const jenkins = new Jenkins({
    port,
    host,
    username,
    password,
    protocol
});