FROM node:10.15.1-alpine

RUN apk add --update autoconf automake g++ make

CMD ["/bin/sh"]
