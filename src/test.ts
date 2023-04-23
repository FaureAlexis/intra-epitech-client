import EpitechClient from ".";

const client = new EpitechClient("user=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpbiI6ImFsZXhpcy5mYXVyZUBlcGl0ZWNoLmV1IiwidHoiOm51bGwsImV4cCI6MTY4MjQwODkyNn0.ds3J7NBiBwKLM9cWi33NXjvLzkY4jzkY4KtR2V01PxU");

async function testClient() {
  const name = await client.user.getStudentName();
  const year = await client.user.getStudentYear();
  const promo = await client.user.getStudentPromo();
  const gpa = await client.user.getStudentGPA();
  const location = await client.user.getStudentLocation();
  const credits = await client.user.getStudentCredits();
  const cycle = await client.user.getStudentCycle();
  const netsoul = await client.user.getStudentNetsoul();
  console.log(`Name: ${name}`);
  console.log(`Year: ${year}`);
  console.log(`Promo: ${promo}`);
  console.log(`GPA: ${gpa}`);
  console.log(`Location: ${location}`);
  console.log(`Credits: ${credits}`);
  console.log(`Cycle: ${cycle}`);
  console.log(`Netsoul: ${netsoul}`);
  const elearning = await client.elearning.getModuleVideos('B-NWP-400');
  //console.log(elearning);
  const planning = await client.planning.getWholePlanning();
  console.log(planning.length);
  const weekPlanning = await client.planning.getWeekPlanning();
  console.log(weekPlanning.length);
  const todayPlanning = await client.planning.getTodayPlanning();
  console.log(todayPlanning.length);
  const notifications = await client.notifications.getNotifications();
  console.log(notifications.length);
}

testClient();
