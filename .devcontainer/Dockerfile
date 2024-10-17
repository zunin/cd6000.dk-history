FROM denoland/deno:bin-2.0.1 AS deno
FROM mcr.microsoft.com/devcontainers/typescript-node:22
COPY --from=deno /deno /usr/local/bin/deno
# Install the runtime-only C library dependencies we need.
RUN apt-get update \
 && DEBIAN_FRONTEND=noninteractive \
    apt-get install --no-install-recommends --assume-yes \
      pipx
