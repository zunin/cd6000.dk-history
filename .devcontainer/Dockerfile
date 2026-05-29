FROM denoland/deno:bin-2.6.3 AS deno
FROM mcr.microsoft.com/devcontainers/typescript-node:dev-22-bookworm
COPY --from=deno /deno /usr/local/bin/deno
# Install the runtime-only C library dependencies we need.
RUN apt-get update \
 && DEBIAN_FRONTEND=noninteractive \
    apt-get install --no-install-recommends --assume-yes \
      pipx
