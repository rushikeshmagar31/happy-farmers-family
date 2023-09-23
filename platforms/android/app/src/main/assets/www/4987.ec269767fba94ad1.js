"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[4987],{4987:(w,p,r)=>{r.r(p),r.d(p,{LoginPageModule:()=>T,createTranslateLoader:()=>f});var m=r(6895),c=r(4006),i=r(603),d=r(3169),L=r(5861),u=r(9260),n=r(4650),v=r(4009),P=r(3385),l=r(6188),C=r(8690);const Z=[{path:"",component:(()=>{class o{constructor(e,a,t,s,h,b,A,y){this.navCtrl=e,this.google=a,this.loadingController=t,this.fireAuth=s,this.platform=h,this.translateService=b,this.ionLoaderService=A,this.router=y,this.isGoogleLogin=!1,this.language=this.translateService.currentLang,this.slidesOptions={slidesPerView:1.7},this.slideOpts={initialSlide:1,speed:800,loop:!0,autoplay:{delay:1500,disableOnInteraction:!1}}}customizeLoader(e){this.ionLoaderService.customLoader(e)}showLoader(){this.ionLoaderService.simpleLoader()}hideLoader(){this.ionLoaderService.dismissLoader()}opentoastred(e){this.ionLoaderService.openToastDanger(e)}opentoast(e){this.ionLoaderService.openToast(e)}ngOnInit(){var e=this;return(0,L.Z)(function*(){e.loading=yield e.loadingController.create({message:"Connecting ..."})})()}languageChange(){this.translateService.use(this.language)}handleRefresh(e){setTimeout(()=>{e.target.complete()},2e3)}doLogin(){let a;this.customizeLoader("Getting In"),localStorage.setItem("token","generated-auth-token"),this.platform.is("cordova")?(a=this.platform.is("android")?{webClientId:"126136180249-cp321v2jri6nagqa7043m8f6od7vhf6h.apps.googleusercontent.com",offline:!0}:{},this.google.login(a).then(t=>{const{idToken:s,accessToken:h}=t;this.onLoginSuccess(s,h)}).catch(t=>{console.log(t),this.opentoastred(t),alert("error:"+JSON.stringify(t))})):(console.log("else..."),this.fireAuth.signInWithPopup(new u.Z.auth.GoogleAuthProvider).then(t=>{this.isGoogleLogin=!0,this.islogin=!0,this.user=t.user,t?(this.router.navigate(["/tabs/tab1/"]),this.hideLoader()):(this.router.navigate(["/login"]),this.hideLoader())}).catch(t=>(console.log(t.message,"error in google login"),this.islogin=!1,this.opentoastred(t.message),this.hideLoader(),!1)))}onLoginSuccess(e,a){const t=a?u.Z.auth.GoogleAuthProvider.credential(e,a):u.Z.auth.GoogleAuthProvider.credential(e);this.fireAuth.signInWithCredential(t).then(s=>(this.isGoogleLogin=!0,this.user=s.user,this.navCtrl.navigateForward("/tabs/tab1"),this.hideLoader(),!0))}onLoginError(e){console.log(e),this.opentoastred(e)}logout(){this.fireAuth.signOut().then(()=>{this.isGoogleLogin=!1})}loginapmc(){this.router.navigate(["/loginapmc"])}loginadmin(){this.router.navigate(["/admin"])}}return o.\u0275fac=function(e){return new(e||o)(n.Y36(i.SH),n.Y36(v.Q),n.Y36(i.HT),n.Y36(P.zQ),n.Y36(i.t4),n.Y36(l.sK),n.Y36(C.C),n.Y36(d.F0))},o.\u0275cmp=n.Xpm({type:o,selectors:[["app-login"]],decls:44,vars:13,consts:[["slot","fixed",3,"ionRefresh"],["pullingIcon","chevron-down-circle-outline","refreshingSpinner","circles"],["slot","start"],["name","language-outline","size","large"],["interface","popover",3,"ngModel","ngModelChange","ionChange"],["value","mr"],["value","en"],[1,"ion-justify-content-center"],[1,"ion-text-center"],[2,"font-size","30px","font-weight","bold","margin-top","20px"],[2,"font-weight","bold","margin-top","10px"],[2,"font-weight","500","margin-top","10px"],[1,"mainimg"],["src","../../assets/7954539.jpg",2,"max-width","100%","height","auto"],["expand","block",2,"box-shadow","rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 1px","margin-top","20px",3,"click"],["name","logo-google","slot","start"],["fill","outline","size","large","color","primary",2,"width","100%","margin-top","400px",3,"click"],["fill","outline","size","large","color","primary",2,"width","100%","margin-top","10px",3,"click"]],template:function(e,a){1&e&&(n.TgZ(0,"ion-content")(1,"ion-refresher",0),n.NdJ("ionRefresh",function(s){return a.handleRefresh(s)}),n._UZ(2,"ion-refresher-content",1),n.qZA(),n.TgZ(3,"ion-toolbar")(4,"ion-buttons",2)(5,"ion-button"),n._UZ(6,"ion-icon",3),n.TgZ(7,"ion-select",4),n.NdJ("ngModelChange",function(s){return a.language=s})("ionChange",function(){return a.languageChange()}),n.TgZ(8,"ion-select-option",5),n._uU(9,"\u092e\u0930\u093e\u0920\u0940"),n.qZA(),n.TgZ(10,"ion-select-option",6),n._uU(11,"English"),n.qZA()()()()(),n.TgZ(12,"ion-grid")(13,"ion-row",7)(14,"ion-col",8)(15,"h1",9),n._uU(16,"The Farmer's App"),n.qZA(),n.TgZ(17,"p",10),n._uU(18),n.ALo(19,"translate"),n._UZ(20,"br"),n._uU(21),n.ALo(22,"translate"),n.qZA(),n.TgZ(23,"p",11),n._uU(24),n.ALo(25,"translate"),n.qZA()()(),n.TgZ(26,"ion-row")(27,"ion-col")(28,"div",12),n._UZ(29,"img",13),n.qZA()()(),n.TgZ(30,"ion-row")(31,"ion-col",8)(32,"ion-button",14),n.NdJ("click",function(){return a.doLogin()}),n._UZ(33,"ion-icon",15),n._uU(34),n.ALo(35,"translate"),n.qZA()()(),n.TgZ(36,"ion-row")(37,"ion-col",8)(38,"ion-button",16),n.NdJ("click",function(){return a.loginapmc()}),n._uU(39," Login APMC "),n.qZA()()(),n.TgZ(40,"ion-row")(41,"ion-col",8)(42,"ion-button",17),n.NdJ("click",function(){return a.loginadmin()}),n._uU(43," Login Admin "),n.qZA()()()()()),2&e&&(n.xp6(7),n.Q6J("ngModel",a.language),n.xp6(11),n.Oqu(n.lcZ(19,5,"login.info1")),n.xp6(3),n.Oqu(n.lcZ(22,7,"login.info2")),n.xp6(3),n.Oqu(n.lcZ(25,9,"login.trans")),n.xp6(10),n.hij(" ",n.lcZ(35,11,"login.login")," "))},dependencies:[c.JJ,c.On,i.YG,i.Sm,i.wI,i.W2,i.jY,i.gu,i.nJ,i.Wo,i.Nd,i.t9,i.n0,i.sr,i.QI,l.X$],styles:["ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%], ion-header[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]{--background: #f1f5f8;background:#f1f5f8;padding:0 10px}ion-content[_ngcontent-%COMP%]{--background: #dbebe0}ion-content[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]{width:93%;box-shadow:none;padding:18px 0 0;background:#dbebe0;display:flex;align-items:center;justify-content:center;bottom:-32.5rem;left:1%}ion-content[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:50px}ion-content[_ngcontent-%COMP%]   .center[_ngcontent-%COMP%]{margin-top:-2%;text-align:center}ion-content[_ngcontent-%COMP%]   .mainimg[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{top:27%;position:absolute}.center[_ngcontent-%COMP%]{text-align:center;padding:20px}.button-container[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:flex-start;position:absolute;top:80%;left:5%;right:5%;width:90%}ion-button[_ngcontent-%COMP%]{flex:1;margin:0 5px;text-align:center}"]}),o})()}];let x=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=n.oAB({type:o}),o.\u0275inj=n.cJS({imports:[d.Bz.forChild(Z),d.Bz]}),o})();var M=r(9832),O=r(529);function f(o){return new M.w(o,"./assets/i18n/",".json")}let T=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=n.oAB({type:o}),o.\u0275inj=n.cJS({imports:[m.ez,c.u5,i.Pc,x,l.aw.forChild({loader:{provide:l.Zw,useFactory:f,deps:[O.eN]}})]}),o})()}}]);