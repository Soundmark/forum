const Koa = require('koa');
const serve = require('koa-static');
const initRouter = require('./routers');
const koaBody = require('koa-body');
const koaJwt = require('koa-jwt');
//适配vue history的中间件
const {historyApiFallback} = require('koa2-connect-history-api-fallback');

const app = new Koa();

app.use((ctx,next)=>{
  return next().catch(err=>{
    if(err.status===401){
      ctx.status=401;
    }else{
      throw err;
    }
  })
})

app.use(koaJwt({
  secret: 'vue-koa-forum'
}).unless({
  path: [/\/sign-in||\/sign-up/]
}))

// app.use(historyApiFallback({
//   rewrites: [
//     { from: /.*/, to: '/index.html' }
//   ],
//   verbose: true
// }))
app.use(koaBody());  
//静态资源加载
app.use(serve(__dirname+'/dist'));
//注册路由
initRouter(app);
app.listen(3000);