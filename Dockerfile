FROM ubuntu:16.04

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt-get update && \
    apt-get install -y -q --no-install-recommends \
        curl \
        software-properties-common \
        vim \
        git \
        build-essential && \
    rm -rf /var/lib/apt/lists/*

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 8.9.0

RUN curl -k https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash && \
    source $NVM_DIR/nvm.sh && \
    nvm install $NODE_VERSION && \
    nvm alias default $NODE_VERSION && \
    nvm use default

ENV NODE_PATH   $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH        $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH
ENV PORT        10010

RUN npm install -g swagger
RUN npm install -g knex

RUN mkdir /src /node_modules

ADD . /src

WORKDIR /node_modules

WORKDIR /src

RUN npm install

EXPOSE 10010

ENV NODE_TLS_REJECT_UNAUTHORIZED 0

CMD /bin/bash k8s-entry.sh
