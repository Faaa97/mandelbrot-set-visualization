(()=>{"use strict";var t,e,n=(t,e,n)=>{if(!e.has(t))throw TypeError("Cannot "+n)},r=(t,e,r)=>(n(t,e,"read from private field"),r?r.call(t):e.get(t)),i=(t,e,r,i)=>(n(t,e,"write to private field"),i?i.call(t,r):e.set(t,r),r);const a=class{constructor(n,r){t.set(this,void 0),e.set(this,void 0),i(this,t,n),i(this,e,r)}get real(){return r(this,t)}get imaginary(){return r(this,e)}sum(t){const e=this.real+t.real,n=this.imaginary+t.imaginary;return new a(e,n)}substraction(t){const e=this.real-t.real,n=this.imaginary-t.imaginary;return new a(e,n)}multiplication(t){const e=this.real*t.real-this.imaginary*t.imaginary,n=this.real*t.imaginary+this.imaginary*t.real;return new a(e,n)}power(t){const e=this;let n=e;for(let r=0;r<t-1;r++)n=n.multiplication(e);return n}modulus(){const t=this.real*this.real,e=this.imaginary*this.imaginary;return Math.sqrt(t+e)}clone(){const t=this.real,e=this.imaginary;return new a(t,e)}};let o=a;t=new WeakMap,e=new WeakMap;const s=o;var c,u=(t,e,n)=>{if(!e.has(t))throw TypeError("Cannot "+n)};class l{constructor(t){var e,n;c.set(this,void 0),n=t,u(this,e=c,"write to private field"),e.set(this,n)}get limit(){return u(this,t=c,"read from private field"),t.get(this);var t}iterate(t){let e=t.clone(),n=0,r=!1;for(;!1===r&&n<this.limit;)e=e.power(2),e=e.sum(t),e.modulus()>2&&(r=!0),n++;return{converges:!r,iterations:n}}}function h(t,e){return Math.random()*(e-t)+t}function d(t,e,n,r){const i=h(t,e),a=h(n,r);return new s(i,a)}c=new WeakMap;const g=function(){const t=parseInt(prompt("How many points to generate to calculate area?\n1000+ points recommended, however it can take some time")),e=5.625*function(t,e){let n=0;const r=new l(1e4);return t.forEach((t=>{!0===r.iterate(t).converges&&n++})),n}(function(t){const e=[];for(let n=0;n<t;n++){const t=d(-2,.5,.5,1.125);e.push(t)}return e}(t))/t;return{area:e,error:e/Math.sqrt(t)}};function m(t,e,n){const r=n*e,i=t/60,a=r*(1-Math.abs(i%2-1));let o,s,c;i?i>=0&&i<=1?(o=r,s=a,c=0):i>1&&i<=2?(o=a,s=r,c=0):i>2&&i<=3?(o=0,s=r,c=a):i>3&&i<=4?(o=0,s=a,c=r):i>4&&i<=5?(o=a,s=0,c=r):i>5&&i<=6&&(o=r,s=0,c=a):(o=0,s=0,c=0);const u=n-r;return o=255*(o+u),s=255*(s+u),c=255*(c+u),{red:o,green:s,blue:c}}function f(t,e,n){t[e]=n.red,t[e+1]=n.green,t[e+2]=n.blue,t[e+3]=255}function w(t,e,n,r){t.font="30px Sans-serif",t.strokeStyle="black",t.lineWidth=4,t.strokeText(e,n,r),t.fillStyle="white",t.fillText(e,n,r)}function p(t,e,n,r,i,a,o,c){return new s(t+i/o*(e-t),n+a/c*(r-n))}function v(t){!function(t){const e=window.innerHeight;t.height=.8*e,t.width=.8*e*(16/9)}(t);const e=t.getContext("2d");w(e,"Loading",t.width/2-50,t.height/2),setTimeout((()=>{const n=g();(function(t,e,n){const r=function(t,e,n){const r=new l(100),i=t.createImageData(e,n),a=i.data.length;for(let t=0;t<a/4;t++){const a=p(-2,1,-1,1,t%e,t/e,e,n),o=r.iterate(a),s={hue:360*o.iterations/100,saturation:1,value:o.converges?0:1},c=m(s.hue,s.saturation,s.value),u=4*t;f(i.data,u,c)}return i}(t,e,n);t.putImageData(r,0,0)})(e,t.width,t.height),function(t,e,n,r,i){const a=n/10,o=e/20,s=n-a,c=s+a/2;!function(t,e,n,r){w(t,"Area: "+e.toFixed(5),n,r)}(t,r,o,s),function(t,e,n,r){w(t,"Error: "+e.toFixed(5),n,r)}(t,i,o,c)}(e,t.width,t.height,n.area,n.error)}),50)}window.addEventListener("load",(()=>{v(document.getElementById("canvas"))}))})();