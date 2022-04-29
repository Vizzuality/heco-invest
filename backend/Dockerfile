FROM ruby:3.1.0-alpine3.15

ENV BUNDLER_VERSION 2.3.3
ENV RAILS_ENV production

# Install dependencies
RUN apk update && \
    apk upgrade && \
    apk add --update --no-cache \
      curl bash \
      build-base \
      bash \
      git \
      tzdata \
      postgresql-dev \
      imagemagick \
      libgeos-dev \
    && rm -rf /var/cache/apk/*

RUN echo 'gem: -N' >> ~/.gemrc

RUN gem install bundler -v $BUNDLER_VERSION
RUN mkdir -p /usr/src/app

# Set app directory
WORKDIR /usr/src/app

COPY Gemfile.lock Gemfile /usr/src/app/

RUN bundle config set --local --without development test
RUN bundle install --jobs 20 --retry 5

COPY . /usr/src/app

RUN curl -o- https://raw.githubusercontent.com/transifex/cli/v1.0.3/install.sh | bash

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]
