FROM ruby:3.1.0-bullseye

ENV BUNDLER_VERSION 2.3.3
ENV RAILS_ENV production
ENV RAILS_SERVE_STATIC_FILES true

ARG RAILS_RELATIVE_URL_ROOT
ENV RAILS_RELATIVE_URL_ROOT $RAILS_RELATIVE_URL_ROOT

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

# Install dependencies
RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install -y \
      curl bash \
      git tzdata \
      postgresql-client \
      imagemagick \
      libgeos-dev \
      yarn \
    && rm -rf /var/cache/apk/*

RUN echo 'gem: -N' >> ~/.gemrc

RUN gem install bundler -v $BUNDLER_VERSION
RUN mkdir -p /usr/src/app

# Set app directory
WORKDIR /usr/src/app

COPY Gemfile.lock Gemfile /usr/src/app/

RUN bundle config set --local --without development test
RUN bundle install --jobs 20 --retry 5

COPY package.json yarn.lock /usr/src/app/
RUN yarn install

COPY . /usr/src/app

RUN curl -o- https://raw.githubusercontent.com/transifex/cli/v1.4.1/install.sh | bash
ENV PATH "$PATH:/usr/src/app"

EXPOSE 3000

RUN bundle exec rake assets:precompile SECRET_KEY_BASE=secret-key-base

ENTRYPOINT ["./entrypoint.sh"]
