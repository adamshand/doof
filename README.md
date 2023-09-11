# Doof

Doof is a podcast player. Initially I wrote it in Svelte and then migrated to SvelteKit as I realised that routes made a lot of sense for this application.

In theory, it should work with any server which supports the [SubSonic API](http://www.subsonic.org/pages/api.jsp) and podcasts. However, it's only been tested with [Gonic](https://github.com/gonic/).

It currently works as a basic podcast player.

## Current Features

- Browse podcasts
- Browse podcast episodes
- Download episodes to the server (API requires that you are logged in as an admin user)
- Play episodes
- Search episodes title and description

## Possible Features

- Add new podcasts
- Delete podcasts
- Delete downloaded episodes
- Add episodes to a playlist for easier future playback

Doof is my first SvelteKit application, and this is mostly a learning project to get more experience working with APIs.

<img width="392" alt="image" src="https://user-images.githubusercontent.com/130651/203894399-e62f82a9-dd6f-4d96-bc97-ae0d5e6f8cd8.png"> &nbsp; <img width="390" alt="image" src="https://user-images.githubusercontent.com/130651/203894483-897c7285-e762-4a9d-b95d-49368aa9e366.png">
