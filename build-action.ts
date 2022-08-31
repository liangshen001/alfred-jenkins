import alfred from "@liangshen/alfred";
import {jenkins} from "./jenkins.js";
// http://wangliang:11a80c78335a99c57def933dd1db506683@jenkins.longtu.xyz:6086/job/platform_manage_gsc_sandbox_page_118.31.122.16/api/json?pretty=true&tree=inQueue[*],nextBuildNumber[*],builds[number,building,executor[*]
// http://jenkins.longtu.xyz:6086/job/platform_manage_gsc_sandbox_page_118.31.122.16/api/json?pretty=true&tree=inQueue%5B*%5D,nextBuildNumber%5B*%5D,builds[number,building,executor[*]]{0}

const jobName = alfred.input;
await jenkins.buildJob(jobName);

// let building = false;
// let finish = false;
// while (!finish) {
//     await jenkins.getJob(jobName, 'inQueue[*],nextBuildNumber[*]')
//     const result = await fetchNumberJobInfo();
//     if (result?.building) {
//         building = true;
//     }
//     if (!result?.building && building) {
//         finish = true;
//     }
//     await wait(1000);
// }
// console.log(jobName);
//
// async function wait(timeout: number) {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve(undefined);
//         }, timeout)
//     });
// }
//
// async function fetchJobInfo(): Promise<any> {
//     const response = await fetch(`${url}/job/${jobName}/api/json?pretty=true&tree=inQueue%5B*%5D,nextBuildNumber%5B*%5D`, {
//         headers: headers
//     });
//     return response.json();
// }
//
// async function fetchNumberJobInfo() {
//     const response = await fetch(`${url}/job/${jobName}/${nextBuildNumber}/api/json?pretty=true&tree=building,result,estimatedDuration`, {
//         headers: headers
//     });
//     return await response.json() as any;
// }
