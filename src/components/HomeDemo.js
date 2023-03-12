export default {
  headers: {
    host: "httpz.app",
    connection: "close",
    accept: "*/*",
    "user-agent": "GitHub-Hookshot/6c4e595",
    "x-github-event": "ping",
    "x-github-delivery": "99179900-6bb3-11ea-9069-79b2fe7ec6e6",
    "content-type": "application/x-www-form-urlencoded",
    "x-request-id": "12affec1-841e-437e-865f-55f4f6eeea89",
    "x-forwarded-for": "140.82.115.244",
    "x-forwarded-proto": "https",
    "x-forwarded-port": "443",
    via: "1.1 vegur",
    "connect-time": "0",
    "x-request-start": "1584822970803",
    "total-route-time": "0",
    "content-length": "9142",
  },
  method: "POST",
  payload: {
    payload: {
      zen: "Keep it logically awesome.",
      hook_id: 193690843,
      hook: {
        type: "Repository",
        id: 193690843,
        name: "web",
        active: true,
        events: ["*"],
        config: {
          content_type: "form",
          insecure_ssl: "0",
          url: "https://httpz.app/5e767aa0e777e70017c010dc",
        },
        updated_at: "2020-03-21T20:36:10Z",
        created_at: "2020-03-21T20:36:10Z",
        url: "https://api.github.com/repos/jshawl/httpz/hooks/193690843",
        test_url:
          "https://api.github.com/repos/jshawl/httpz/hooks/193690843/test",
        ping_url:
          "https://api.github.com/repos/jshawl/httpz/hooks/193690843/pings",
        last_response: { code: null, status: "unused", message: null },
      },
      repository: {
        id: 31315264,
        node_id: "MDEwOlJlcG9zaXRvcnkzMTMxNTI2NA==",
        name: "httpz",
        full_name: "jshawl/httpz",
        private: false,
        owner: {
          login: "jshawl",
          id: 3824954,
          node_id: "MDQ6VXNlcjM4MjQ5NTQ=",
          avatar_url: "https://avatars2.githubusercontent.com/u/3824954?v=4",
          gravatar_id: "",
          url: "https://api.github.com/users/jshawl",
          html_url: "https://github.com/jshawl",
          followers_url: "https://api.github.com/users/jshawl/followers",
          following_url:
            "https://api.github.com/users/jshawl/following{/other_user}",
          gists_url: "https://api.github.com/users/jshawl/gists{/gist_id}",
          starred_url:
            "https://api.github.com/users/jshawl/starred{/owner}{/repo}",
          subscriptions_url:
            "https://api.github.com/users/jshawl/subscriptions",
          organizations_url: "https://api.github.com/users/jshawl/orgs",
          repos_url: "https://api.github.com/users/jshawl/repos",
          events_url: "https://api.github.com/users/jshawl/events{/privacy}",
          received_events_url:
            "https://api.github.com/users/jshawl/received_events",
          type: "User",
          site_admin: false,
        },
        html_url: "https://github.com/jshawl/httpz",
        description: "Inspect HTTP requests",
        fork: false,
        url: "https://api.github.com/repos/jshawl/httpz",
        forks_url: "https://api.github.com/repos/jshawl/httpz/forks",
        keys_url: "https://api.github.com/repos/jshawl/httpz/keys{/key_id}",
        collaborators_url:
          "https://api.github.com/repos/jshawl/httpz/collaborators{/collaborator}",
        teams_url: "https://api.github.com/repos/jshawl/httpz/teams",
        hooks_url: "https://api.github.com/repos/jshawl/httpz/hooks",
        issue_events_url:
          "https://api.github.com/repos/jshawl/httpz/issues/events{/number}",
        events_url: "https://api.github.com/repos/jshawl/httpz/events",
        assignees_url:
          "https://api.github.com/repos/jshawl/httpz/assignees{/user}",
        branches_url:
          "https://api.github.com/repos/jshawl/httpz/branches{/branch}",
        tags_url: "https://api.github.com/repos/jshawl/httpz/tags",
        blobs_url: "https://api.github.com/repos/jshawl/httpz/git/blobs{/sha}",
        git_tags_url:
          "https://api.github.com/repos/jshawl/httpz/git/tags{/sha}",
        git_refs_url:
          "https://api.github.com/repos/jshawl/httpz/git/refs{/sha}",
        trees_url: "https://api.github.com/repos/jshawl/httpz/git/trees{/sha}",
        statuses_url:
          "https://api.github.com/repos/jshawl/httpz/statuses/{sha}",
        languages_url: "https://api.github.com/repos/jshawl/httpz/languages",
        stargazers_url: "https://api.github.com/repos/jshawl/httpz/stargazers",
        contributors_url:
          "https://api.github.com/repos/jshawl/httpz/contributors",
        subscribers_url:
          "https://api.github.com/repos/jshawl/httpz/subscribers",
        subscription_url:
          "https://api.github.com/repos/jshawl/httpz/subscription",
        commits_url: "https://api.github.com/repos/jshawl/httpz/commits{/sha}",
        git_commits_url:
          "https://api.github.com/repos/jshawl/httpz/git/commits{/sha}",
        comments_url:
          "https://api.github.com/repos/jshawl/httpz/comments{/number}",
        issue_comment_url:
          "https://api.github.com/repos/jshawl/httpz/issues/comments{/number}",
        contents_url:
          "https://api.github.com/repos/jshawl/httpz/contents/{+path}",
        compare_url:
          "https://api.github.com/repos/jshawl/httpz/compare/{base}...{head}",
        merges_url: "https://api.github.com/repos/jshawl/httpz/merges",
        archive_url:
          "https://api.github.com/repos/jshawl/httpz/{archive_format}{/ref}",
        downloads_url: "https://api.github.com/repos/jshawl/httpz/downloads",
        issues_url: "https://api.github.com/repos/jshawl/httpz/issues{/number}",
        pulls_url: "https://api.github.com/repos/jshawl/httpz/pulls{/number}",
        milestones_url:
          "https://api.github.com/repos/jshawl/httpz/milestones{/number}",
        notifications_url:
          "https://api.github.com/repos/jshawl/httpz/notifications{?since,all,participating}",
        labels_url: "https://api.github.com/repos/jshawl/httpz/labels{/name}",
        releases_url: "https://api.github.com/repos/jshawl/httpz/releases{/id}",
        deployments_url:
          "https://api.github.com/repos/jshawl/httpz/deployments",
        created_at: "2015-02-25T13:40:04Z",
        updated_at: "2020-03-21T19:05:43Z",
        pushed_at: "2020-03-21T19:02:56Z",
        git_url: "git://github.com/jshawl/httpz.git",
        ssh_url: "git@github.com:jshawl/httpz.git",
        clone_url: "https://github.com/jshawl/httpz.git",
        svn_url: "https://github.com/jshawl/httpz",
        homepage: "https://httpz.app",
        size: 334,
        stargazers_count: 19,
        watchers_count: 19,
        language: "JavaScript",
        has_issues: true,
        has_projects: true,
        has_downloads: true,
        has_wiki: true,
        has_pages: false,
        forks_count: 5,
        mirror_url: null,
        archived: false,
        disabled: false,
        open_issues_count: 3,
        license: {
          key: "other",
          name: "Other",
          spdx_id: "NOASSERTION",
          url: null,
          node_id: "MDc6TGljZW5zZTA=",
        },
        forks: 5,
        open_issues: 3,
        watchers: 19,
        default_branch: "master",
      },
      sender: {
        login: "jshawl",
        id: 3824954,
        node_id: "MDQ6VXNlcjM4MjQ5NTQ=",
        avatar_url: "https://avatars2.githubusercontent.com/u/3824954?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/jshawl",
        html_url: "https://github.com/jshawl",
        followers_url: "https://api.github.com/users/jshawl/followers",
        following_url:
          "https://api.github.com/users/jshawl/following{/other_user}",
        gists_url: "https://api.github.com/users/jshawl/gists{/gist_id}",
        starred_url:
          "https://api.github.com/users/jshawl/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/jshawl/subscriptions",
        organizations_url: "https://api.github.com/users/jshawl/orgs",
        repos_url: "https://api.github.com/users/jshawl/repos",
        events_url: "https://api.github.com/users/jshawl/events{/privacy}",
        received_events_url:
          "https://api.github.com/users/jshawl/received_events",
        type: "User",
        site_admin: false,
      },
    },
  },
};
