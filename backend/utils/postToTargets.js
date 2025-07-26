const postToTargets = (targets, email) => {
  targets.forEach((target) => {
    //A log as mentioned in the email
    console.log(`Mock POST to ${target} for ${email} → 200 OK`);
  });
};

module.exports = postToTargets;
