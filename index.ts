import alfred, {OutputItem} from "@liangshen/alfred";
import {jenkins} from "./jenkins.js";

let oddEven = false;
// alfy.cache.set('@liangshen/alfred-jenkins/odd-even', !oddEven);
const lock = alfred.input.startsWith('!') || alfred.input.endsWith('!');
let jobItems: OutputItem[];
try {
    const info = await jenkins.getInfo('jobs[name,color,description,inQueue,builds[number,building,executor[*]]{0}]')
    jobItems = info.jobs!.map((job: any) => ({
        title: `${job.name}${job.inQueue ? '[0%]' : ''}${job.builds[0]?.building ? ('[' + job.builds[0].executor.progress + '%]') : ''}`,
        subtitle: job.description,
        icon: {
            path: `images/${(job.builds[0]?.building && oddEven && !lock) ? 'empty' : job.color}.png`
        },
        text: {
            copy: `${job.name}`,
            largetype: `${job.name}`
        },
        quicklookurl: `${jenkins.url}/job/${job.name}`,
        arg: `${jenkins.url}/job/${job.name}`,
        mods: {
            cmd: {
                subtitle: `${job.builds[0]?.building ? 'Cancel Build' : 'Build'} ${job.name}`,
                arg: job.name,
            }
        }
    }));
} catch (e) {
    console.log(e);
    jobItems = [];
}
const openItem = {
    title: 'Open Jenkins URL',
    arg: jenkins.url
};
let input = alfred.input?.toLowerCase() || '';
if (lock) {
    if (input.startsWith('!')) {
        input = input.substring(1);
    }
    if (input.endsWith('!')) {
        input = input.slice(0, -1);
    }
}
alfred.output({items: [openItem, ...jobItems]}, ['title'])
