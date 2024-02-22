<p align="center">
    <a href="https://omnidash.io" target="_blank" rel="noopener">
        <img src="/static/github.png" alt="Omnidash - Keep your operation teams sane" />
    </a>
</p>

<div align="center">
  <a href="https://sonarcloud.io/api/project_badges/measure?project=bartvdbraak_omnidash&metric=alert_status"><img src="https://sonarcloud.io/api/project_badges/measure?project=bartvdbraak_omnidash&metric=alert_status" /></a>
  <a href="https://omnidash-unlighthouse.pages.dev"><img src="https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/bartvdbraak/b948b29508e19955106a1037d2a615e6/raw/omnidash.io-unlighthouse.json" /></a>
  <a href="https://github.com/bartvdbraak/omnidash/deployments/activity_log?environment=Production"><img src="https://img.shields.io/github/deployments/bartvdbraak/omnidash/production?label=vercel&logo=vercel" /></a>
</div>

---

[Omnidash](https://omnidash.io) is an open source ticket sourcing system, consisting of:

- [PocketBase](https://pocketbase.io) for ease of extensibility, user and database management
- [SvelteKit](https://kit.svelte.dev) frontend built using design principles from [`shadcn-svelte`](https://www.shadcn-svelte.com/)
- Multiple login flows (username, email, Oauth2)
- API Connectors to preset and custom ticket vendors

Omnidash is most useful to Managed Service Providers that have to keep track of customer tickets which aren't yet consolidated into a single system due to customer requirements.

> [!WARNING]
> This project is still in active development and should not be seen as production-ready.
> Full documentation, guides and examples will be coming soon.

## Setup overview

### Frontend

To install the project and its dependencies, follow these steps:

1.  Ensure you have `pnpm` installed on your system. If not, you can install it by running:

    ```sh-session
    npm install -g pnpm
    ```

2.  Run the following command to install the project dependencies:
    ```sh-session
    pnpm install
    ```

To develop this locally, you can use the following command:

```sh-session
pnpm run dev -- --open
```

### Backend

You can run the backend locally by running:

```sh-session
./backend/pocketbase serve
```

You can use the `--help` flag to determine if you need additional setup.

Alternatively, you can run our Docker image:

```sh-session
docker run us-central1-docker.pkg.dev/omnidash-414814/omnidash-pb/main
```

### Environment Variables

After setting up the required services, you need to set the corresponding environment variables in the `/.env` file. To do this, follow these steps:

1.  Make a copy of the `.env.example` file:
    ```sh-session
    cp .env.example .env
    ```
2.  Open the `.env` file in a text editor and populate the values for the services mentioned above.

### Build

To build the project, execute the following command:

```sh-session
pnpm build
```

## Security

If you discover a security vulnerability within PocketBase, please send an e-mail to **bart at vanderbraak.nl**.

All reports will be promptly addressed, and you'll be credited accordingly.

## Contributing

PocketBase is free and open source project licensed under the [GPLv3](LICENSE).
You are free to do whatever you want with it, even offering it as a paid service.

You could help continuing its development by:

- [Contribute to the source code](.github/CONTRIBUTING.md)
- [Suggest new features and report issues](https://github.com/bartvdbraak/omnidash/issues)
