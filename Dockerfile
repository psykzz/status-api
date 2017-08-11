FROM mhart/alpine-node

WORKDIR /src

# If you have native dependencies, you'll need extra tools
RUN apk add --no-cache make gcc g++ python

# If you need npm, don't use a base tag
ADD package.json package.json
ADD yarn.lock yarn.lock
RUN yarn
ADD . .

CMD ["npm", "start"]
