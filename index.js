const github = require("@actions/github");
const core = require("@actions/core");
const graphql = require("@octokit/graphql");
const actions = require("@jestaubach/actions");

async function run() {
  const myToken = process.env.ACTION_TOKEN ? process.env.ACTION_TOKEN : core.getInput("action-token");
  const commentText = process.env.COMMENT_TEXT ? process.env.COMMENT_TEXT : core.getInput("comment-text");
  //const octokit = new github.GitHub(myToken);
  const graphqlWithAuth = graphql.defaults({
    headers: {
      authorization: `token secret123`
    }
  });
  const context = github.context;
  
  console.log(
    `>> Action triggered by issue #${context.issue.number}\n`,
    `   << Comment on issue with a greeting: "${commentText}"`,
  );
  await actions.githubProjects.addComment(graphqlWithAuth, context, commentText);
}

run()
  .then(
    (response) => { console.log(`Finished running: ${response}`); },
    (error) => { 
      console.log(`#ERROR# ${error}`);
      process.exit(1); 
    }
  );
