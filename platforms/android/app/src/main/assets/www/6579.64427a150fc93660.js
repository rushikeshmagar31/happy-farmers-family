"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6579],{6579:(Z,l,r)=>{r.r(l),r.d(l,{ApmcdashPageModule:()=>T});var m=r(6895),d=r(4006),i=r(603),h=r(3169),p=r(5861),u=r(9260),e=r(4650),f=r(7053),v=r(8690),M=r(3021),A=r(3385);const P=[{path:"",component:(()=>{class n{constructor(t,o,s,a,g){this.authservice=t,this.ionLoaderService=o,this.loginapmc=s,this.afAuth=a,this.navCtrl=g,this.rate={district:"",market:"",commodity:"",price:"",date:""},this.rates=[]}handleRefresh(t){setTimeout(()=>{t.target.complete(),this.rate.commodity="",this.rate.market="",this.rate.price="",this.rate.date=""},2e3)}ngOnInit(){var t=this.authservice.myemail;console.log(t);var o=t.substring(0,t.indexOf("apmc@"));this.username=o[0].toUpperCase()+o.slice(1),console.log(this.username),this.rate.district=this.username}showLoader(){this.ionLoaderService.simpleLoader()}hideLoader(){this.ionLoaderService.dismissLoader()}customizeLoader(t){this.ionLoaderService.customLoader(t)}opentoastred(t){this.ionLoaderService.openToastDanger(t)}opentoast(t){this.ionLoaderService.openToast(t)}back(){var t=this;return new Promise(function(){var o=(0,p.Z)(function*(s,a){(yield t.afAuth.currentUser)&&t.afAuth.signOut().then(()=>{console.log("LOG Out"),t.navCtrl.navigateForward("/loginapmc")}).catch(g=>{a()})});return function(s,a){return o.apply(this,arguments)}}())}submitrate(){""==this.rate.district?this.authservice.presentToast("Enter District"):""==this.rate.market?this.authservice.presentToast("Enter Market"):""==this.rate.commodity?this.authservice.presentToast("Enter Commodity"):""==this.rate.price?this.authservice.presentToast("Enter Price"):""==this.rate.date?this.authservice.presentToast("Enter Date"):(this.customizeLoader("Submitting Data"),u.Z.database().ref("rates").push(this.rate).then(t=>{console.log(t),console.log(this.rate),this.hideLoader(),this.opentoast("Submitted")}))}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(f.$),e.Y36(v.C),e.Y36(M._),e.Y36(A.zQ),e.Y36(i.SH))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-apmcdash"]],decls:36,vars:6,consts:[[3,"fullscreen"],["slot","fixed",3,"ionRefresh"],["pullingIcon","chevron-down-circle-outline","refreshingSpinner","circles"],[1,"ion-no-border"],["slot","start"],["name","log-out-outline","size","large",3,"click"],[1,"card"],[1,"card-content"],[1,"bottom"],[1,"main"],[2,"color","black","font-size","21px"],[1,"formBody"],["type","text","placeholder","Market",3,"ngModel","ngModelChange"],["type","text","placeholder","Commodity",3,"ngModel","ngModelChange"],["type","text","placeholder","Price",3,"ngModel","ngModelChange"],["type","date","placeholder","Date",3,"ngModel","ngModelChange"],[3,"click"]],template:function(t,o){1&t&&(e.TgZ(0,"ion-content",0)(1,"ion-refresher",1),e.NdJ("ionRefresh",function(a){return o.handleRefresh(a)}),e._UZ(2,"ion-refresher-content",2),e.qZA(),e.TgZ(3,"ion-header",3)(4,"ion-toolbar")(5,"ion-buttons",4)(6,"ion-icon",5),e.NdJ("click",function(){return o.back()}),e.qZA()()()(),e.TgZ(7,"div",6)(8,"div",7)(9,"div",8)(10,"h2"),e._uU(11),e.qZA()()()(),e.TgZ(12,"div",9)(13,"div")(14,"p",10),e._uU(15,"Add Details"),e.qZA()(),e.TgZ(16,"div",11)(17,"ion-item")(18,"ion-label"),e._uU(19,"Market"),e.qZA(),e.TgZ(20,"ion-input",12),e.NdJ("ngModelChange",function(a){return o.rate.market=a}),e.qZA()(),e.TgZ(21,"ion-item")(22,"ion-label"),e._uU(23,"Commodity"),e.qZA(),e.TgZ(24,"ion-input",13),e.NdJ("ngModelChange",function(a){return o.rate.commodity=a}),e.qZA()(),e.TgZ(25,"ion-item")(26,"ion-label"),e._uU(27,"Price"),e.qZA(),e.TgZ(28,"ion-input",14),e.NdJ("ngModelChange",function(a){return o.rate.price=a}),e.qZA()(),e.TgZ(29,"ion-item")(30,"ion-label"),e._uU(31,"Date"),e.qZA(),e.TgZ(32,"ion-input",15),e.NdJ("ngModelChange",function(a){return o.rate.date=a}),e.qZA()()(),e.TgZ(33,"div")(34,"ion-button",16),e.NdJ("click",function(){return o.submitrate()}),e._uU(35,"Submit"),e.qZA()()()()),2&t&&(e.Q6J("fullscreen",!0),e.xp6(11),e.hij("Welcome, ",o.username," APMC"),e.xp6(9),e.Q6J("ngModel",o.rate.market),e.xp6(4),e.Q6J("ngModel",o.rate.commodity),e.xp6(4),e.Q6J("ngModel",o.rate.price),e.xp6(4),e.Q6J("ngModel",o.rate.date))},dependencies:[d.JJ,d.On,i.YG,i.Sm,i.W2,i.Gu,i.gu,i.pK,i.Ie,i.Q$,i.nJ,i.Wo,i.sr,i.j9],styles:[".formBody[_ngcontent-%COMP%]{width:100%;position:relative;padding:0 33px 28px}.card[_ngcontent-%COMP%]{max-width:500px;width:100%;height:115px;position:relative;padding:3rem 2rem;color:#fff;justify-self:center}.card[_ngcontent-%COMP%]   .card-content[_ngcontent-%COMP%]{height:100%;display:flex;flex-direction:column;align-items:space-between;justify-content:space-between;text-align:center}.card[_ngcontent-%COMP%]   .card-content[_ngcontent-%COMP%]   .bottom[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:2rem;color:#000;margin-top:0%}.card[_ngcontent-%COMP%]   .card-bg[_ngcontent-%COMP%]{position:fixed;top:0;left:0;bottom:0;right:0;overflow:hidden;z-index:-1}.card[_ngcontent-%COMP%]   .card-bg[_ngcontent-%COMP%]   .bg-img[_ngcontent-%COMP%]{height:100%;object-fit:cover;vertical-align:middle;width:100%;filter:blur(3px)}.main[_ngcontent-%COMP%]{position:relative;text-align:center}"]}),n})()}];let C=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[h.Bz.forChild(P),h.Bz]}),n})(),T=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[m.ez,d.u5,i.Pc,C]}),n})()}}]);