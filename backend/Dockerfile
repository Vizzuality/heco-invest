FROM ruby:3.1.0-alpine3.15

ENV BUNDLER_VERSION 2.3.3
ENV RAILS_ENV production

ARG TRANSIFEX_TOKEN
ENV TX_TOKEN $TRANSIFEX_TOKEN

# Install dependencies
RUN apk update && \
    apk upgrade && \
    apk add --update --no-cache \
      build-base \
      bash \
      git \
#      nodejs \
#      tzdata \
#      libxml2-dev \
#      libxslt-dev \
      postgresql-dev \
#      imagemagick-dev \
#      shared-mime-info \
    && rm -rf /var/cache/apk/*
RUN apk update \
    && apk add build-base \
       tzdata
RUN echo 'gem: -N' >> ~/.gemrc
RUN gem --version
RUN gem install bundler -v $BUNDLER_VERSION
RUN mkdir -p /usr/src/app

# Set app directory
WORKDIR /usr/src/app

COPY Gemfile.lock Gemfile /usr/src/app/

RUN bundle config set --local --without development test
RUN bundle install --jobs 20 --retry 5

RUN curl -o- https://raw.githubusercontent.com/transifex/cli/v1.0.3/install.sh | bash
RUN ./tx pull

COPY . /usr/src/app

EXPOSE 3000
ENTRYPOINT ["./entrypoint.sh"]

