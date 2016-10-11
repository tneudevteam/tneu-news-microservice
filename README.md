# TNEU News Microservice

## API

### /snippets?limit={Number}&skip={Number}&since={ISODateString}

Example requests:

* `/snippets`
* `/snippets?limit=20&skip=0&since=2016-10-10`
* `/snippets?limit=20&skip=0&since=2016-10-10T12:00:00Z`

Example response:

```javascript
[
  {
    title: 'На кафедрі фінансів імені...',
    date: 'Sun Sep 18 2016 19:31:25 GMT+0300 (EEST)',
    topic: 'Міжнародні програми',
    imageLink: 'http://www.tneu.edu.ua/uploads/posts/2016-09/....',
    description: '14 вересня 2016 р. студенти та викладачі кафедри фінансів...',
    readMoreLink: 'http://www.tneu.edu.ua/news/9678-na-kafedri....'
  }, {/* 14 more... */}
]
```

### /fake-snippets?since={ISODateString}

For development purposes. Will return 1-5 random news with date
between today and passed in `since`.

### /article?link=url

Get news article by direct link.

Example response:

```javascript
{
  title: 'На кафедрі фінансів імені...',
  date: 'Sun Sep 18 2016 19:31:25 GMT+0300 (EEST)',
  imageLink: 'http://www.tneu.edu.ua/uploads/posts/2016-09/....',
  author: 'Відділ інформації та зв`язків з громадськістю ',
  text: '14 вересня 2016 р. студенти та викладачі кафедри фінансів...',
  photos: ['http://www.tneu.edu.ua/uploads/posts/...', '....'],
  attachments: [{
    name: '....',
    link: '....'
  }]
}
```

## Development

### Docker

#### Build

```
$ docker build -t news-microservice .
```

#### Run

Make sure you have mongodb instance running.

```
$ docker run -d \
  -p 9191:9191 \
  -e MONGO_URL="mongodb://user:pass@host:port/db" \
  news-microservice
```

Optionally you can provide `LOG_HOST` and `LOG_PORT` to redirect logs to remote destination.

```
$ docker run -d \
  -p 9191:9191 \
  -e LOG_HOST="" \
  -e LOG_PORT="" \
  -e MONGO_URL="mongodb://user:pass@host:port/db" \
  news-microservice
```

### Linting

Used: eslint, eslint-config-google

```
$ npm run lint
```
