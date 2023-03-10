export async function getMyProfile() {
    const response = await fetch("/api/profile/my");
     const data = await response.json();
     return {username: data.username, handleid: data.disp_handleid, userintid: data.userintid, useruuid: data.useruuid}
}