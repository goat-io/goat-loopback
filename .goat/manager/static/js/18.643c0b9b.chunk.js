(this["webpackJsonp@goatlab/manager"]=this["webpackJsonp@goatlab/manager"]||[]).push([[18],{207:function(e,t,a){"use strict";var n=a(175),l=a(176),r=a(178),c=a(177),o=a(0),m=a.n(o),u=a(14),s=a.n(u),i=a(16),d=a.n(i),E=a(42),b=a(174),p=a(229),h=a(228),g=a(44),f=a(208),v=a(5),O=a(13),N=function(){var e=function(){var e=Object(f.a)().resourceStore;return Object(v.d)((function(){return{update:e.updateResource,create:e.createResource,fetch:e.fetchResources,del:e.deleteResource}}))}(),t=e.update,a=e.create,n=e.fetch,l=e.del,r=Object(O.g)()._id,c=function(){var e=Object(E.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!r){e.next=5;break}return e.next=3,t();case 3:e.next=7;break;case 5:return e.next=7,a();case 7:Object(g.f)("Restarting server...",{transition:g.c,closeButton:!0,autoClose:15e3,position:"bottom-center",type:"success",onClose:function(){var e=Object(E.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n();case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()});case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),u=function(){var e=Object(E.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!r){e.next=3;break}return e.next=3,l();case 3:Object(g.f)("Restarting server...",{transition:g.c,closeButton:!0,autoClose:15e3,position:"bottom-center",type:"success",onClose:function(){var e=Object(E.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n();case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()});case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return m.a.createElement(o.Fragment,null,m.a.createElement(b.e,{className:"btn-shadow mr-3",onClick:c,color:"primary",id:"Tooltip-123"},m.a.createElement(h.a,{icon:p.C})),m.a.createElement(b.e,{className:"btn-shadow mr-3",onClick:u,color:"red",id:"Tooltip-123"},m.a.createElement(h.a,{icon:p.F})))},y=function(e){Object(r.a)(a,e);var t=Object(c.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){var e=this.props,t=e.enablePageTitleIcon,a=e.enablePageTitleSubheading,n=e.heading,l=e.icon,r=e.subheading;return m.a.createElement("div",{className:"app-page-title"},m.a.createElement("div",{className:"page-title-wrapper"},m.a.createElement("div",{className:"page-title-heading"},m.a.createElement("div",{className:s()("page-title-icon",{"d-none":!t})},m.a.createElement("i",{className:l})),m.a.createElement("div",{className:"page-title"},n,m.a.createElement("div",{className:s()("page-title-subheading",{"d-none":!a})},r))),m.a.createElement("div",{className:"page-title-actions"},m.a.createElement(N,null))))}}]),a}(o.Component);t.a=y},208:function(e,t,a){"use strict";a.d(t,"a",(function(){return p}));var n=a(0),l=a.n(n),r=a(16),c=a.n(r),o=a(284),m=a(285),u=a(41),s=u.c.model("SubmissionAccess",{roles:u.c.optional(u.c.array(u.c.string),[]),type:u.c.string}),i=u.c.model("Resource",{_id:u.c.maybe(u.c.string),type:u.c.string,tags:u.c.union(u.c.array(u.c.string),u.c.string),components:u.c.union(u.c.string,u.c.undefined),title:u.c.string,display:u.c.maybe(u.c.string),action:u.c.maybe(u.c.string),name:u.c.string,path:u.c.string,machineName:u.c.string,created:u.c.maybe(u.c.string),modified:u.c.maybe(u.c.string),owner:u.c.union(u.c.maybe(u.c.string),u.c.null),deleted:u.c.maybe(u.c.union(u.c.number,u.c.undefined)),settings:u.c.union(u.c.maybe(u.c.number),u.c.null),properties:u.c.maybe(u.c.number),access:u.c.union(u.c.array(s),u.c.array(u.c.string)),submissionAccess:u.c.union(u.c.array(s),u.c.array(u.c.string))}),d=a(243),E=u.c.model("ResourceStore",{resources:u.c.array(i),editingResource:u.c.maybe(i)}).actions((function(e){return{getResource:function(t){return e.resources.find((function(e){return e.path===t}))},setEditingResource:function(t){e.editingResource=t},setEditingResourceField:function(t,a){var n=Object(u.b)(e);if(n&&n.editingResource){var l=Object(m.a)({},n.editingResource,{},Object(o.a)({},t,a));e.editingResource=l}},fetchResources:Object(u.a)(c.a.mark((function t(){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,d.a.remote().all();case 3:e.resources=t.sent,t.next=9;break;case 6:t.prev=6,t.t0=t.catch(0),console.error("Failed to fetch resources",t.t0);case 9:case"end":return t.stop()}}),t,null,[[0,6]])}))),updateResource:Object(u.a)(c.a.mark((function t(){var a,n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,a=Object(u.b)(e),n=JSON.parse(JSON.stringify(a.editingResource,(function(e,t){return null===t?void 0:t}))),t.next=5,d.a.remote().update(n);case 5:t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.error("Failed to save",t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])}))),createResource:Object(u.a)(c.a.mark((function t(){var a,n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,a=Object(u.b)(e),delete(n=JSON.parse(JSON.stringify(a.editingResource,(function(e,t){return null===t?void 0:t}))))._id,delete n.created,delete n.modified,t.next=8,d.a.remote().insert(n);case 8:e.editingResource=t.sent,t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),console.error("Failed to save",t.t0);case 14:case"end":return t.stop()}}),t,null,[[0,11]])}))),deleteResource:Object(u.a)(c.a.mark((function t(){var a,n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,a=Object(u.b)(e),n=JSON.parse(JSON.stringify(a.editingResource)),t.next=5,d.a.remote().removeById(n._id);case 5:t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.error("Failed to delete",t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))}})),b=l.a.createContext({resourceStore:E.create()}),p=function(){return l.a.useContext(b)}},223:function(e,t,a){"use strict";var n=a(0),l=a.n(n),r=a(252),c=a.n(r),o=a(14),m=a.n(o),u=a(229),s=a(228),i=a(174),d=a(40),E=a(5),b=a(39),p=Object(b.a)((function(){var e=function(){var e=Object(d.a)().themeStore;return Object(E.d)((function(){return{mobile:e.mobile,activeSecondaryMenuMobile:e.activeSecondaryMenuMobile,toggleMobileSidebar:e.toggleMobileSidebar,toggleSecondaryMenuMobile:e.toggleSecondaryMenuMobile}}))}(),t=e.mobile,a=e.activeSecondaryMenuMobile,n=e.toggleMobileSidebar,r=e.toggleSecondaryMenuMobile;return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"app-header__mobile-menu"},l.a.createElement("div",{onClick:n},l.a.createElement(c.a,{active:t,type:"elastic",onClick:n}))),l.a.createElement("div",{className:"app-header__menu"},l.a.createElement("span",{onClick:n},l.a.createElement(i.e,{size:"sm",className:m()("btn-icon btn-icon-only",{active:a}),color:"primary",onClick:r},l.a.createElement("div",{className:"btn-icon-wrapper"},l.a.createElement(s.a,{icon:u.A}))))))})),h=Object(b.a)((function(){var e=function(){var e=Object(d.a)().themeStore;return Object(E.d)((function(){return{drawerOpen:e.drawerOpen,toggleDrawer:e.toggleDrawer}}))}(),t=e.drawerOpen,a=e.toggleDrawer;return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"app-header__logo"},l.a.createElement("div",{className:"logo-src"}),l.a.createElement("div",{className:"header__pane ml-auto"},l.a.createElement("div",{onClick:a},l.a.createElement(c.a,{active:t,type:"elastic"})))),l.a.createElement(p,null))}));t.a=h},2377:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(13),c=a(192),o=a.n(c),m=a(174),u=a(207),s=a(175),i=a(176),d=a(178),E=a(177),b=function(e){Object(d.a)(a,e);var t=Object(E.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return l.a.createElement(m.cb,{className:"mb-0"},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"#"),l.a.createElement("th",null,"First Name"),l.a.createElement("th",null,"Last Name"),l.a.createElement("th",null,"Username"))),l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("th",{scope:"row"},"1"),l.a.createElement("td",null,"Mark"),l.a.createElement("td",null,"Otto"),l.a.createElement("td",null,"@mdo")),l.a.createElement("tr",null,l.a.createElement("th",{scope:"row"},"2"),l.a.createElement("td",null,"Jacob"),l.a.createElement("td",null,"Thornton"),l.a.createElement("td",null,"@fat")),l.a.createElement("tr",null,l.a.createElement("th",{scope:"row"},"3"),l.a.createElement("td",null,"Larry"),l.a.createElement("td",null,"the Bird"),l.a.createElement("td",null,"@twitter"))))}}]),a}(l.a.Component),p=function(e){Object(d.a)(a,e);var t=Object(E.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return l.a.createElement(m.cb,{className:"mb-0",bordered:!0},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"#"),l.a.createElement("th",null,"First Name"),l.a.createElement("th",null,"Last Name"),l.a.createElement("th",null,"Username"))),l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("th",{scope:"row"},"1"),l.a.createElement("td",null,"Mark"),l.a.createElement("td",null,"Otto"),l.a.createElement("td",null,"@mdo")),l.a.createElement("tr",null,l.a.createElement("th",{scope:"row"},"2"),l.a.createElement("td",null,"Jacob"),l.a.createElement("td",null,"Thornton"),l.a.createElement("td",null,"@fat")),l.a.createElement("tr",null,l.a.createElement("th",{scope:"row"},"3"),l.a.createElement("td",null,"Larry"),l.a.createElement("td",null,"the Bird"),l.a.createElement("td",null,"@twitter"))))}}]),a}(l.a.Component),h=function(e){Object(d.a)(a,e);var t=Object(E.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return l.a.createElement(m.cb,{borderless:!0,className:"mb-0"},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"#"),l.a.createElement("th",null,"First Name"),l.a.createElement("th",null,"Last Name"),l.a.createElement("th",null,"Username"))),l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("th",{scope:"row"},"1"),l.a.createElement("td",null,"Mark"),l.a.createElement("td",null,"Otto"),l.a.createElement("td",null,"@mdo")),l.a.createElement("tr",null,l.a.createElement("th",{scope:"row"},"2"),l.a.createElement("td",null,"Jacob"),l.a.createElement("td",null,"Thornton"),l.a.createElement("td",null,"@fat")),l.a.createElement("tr",null,l.a.createElement("th",{scope:"row"},"3"),l.a.createElement("td",null,"Larry"),l.a.createElement("td",null,"the Bird"),l.a.createElement("td",null,"@twitter"))))}}]),a}(l.a.Component),g=function(e){Object(d.a)(a,e);var t=Object(E.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return l.a.createElement(m.cb,{dark:!0,className:"mb-0"},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"#"),l.a.createElement("th",null,"First Name"),l.a.createElement("th",null,"Last Name"),l.a.createElement("th",null,"Username"))),l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("th",{scope:"row"},"1"),l.a.createElement("td",null,"Mark"),l.a.createElement("td",null,"Otto"),l.a.createElement("td",null,"@mdo")),l.a.createElement("tr",null,l.a.createElement("th",{scope:"row"},"2"),l.a.createElement("td",null,"Jacob"),l.a.createElement("td",null,"Thornton"),l.a.createElement("td",null,"@fat")),l.a.createElement("tr",null,l.a.createElement("th",{scope:"row"},"3"),l.a.createElement("td",null,"Larry"),l.a.createElement("td",null,"the Bird"),l.a.createElement("td",null,"@twitter"))))}}]),a}(l.a.Component),f=function(e){Object(d.a)(a,e);var t=Object(E.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return l.a.createElement(m.cb,{hover:!0,className:"mb-0"},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"#"),l.a.createElement("th",null,"First Name"),l.a.createElement("th",null,"Last Name"),l.a.createElement("th",null,"Username"))),l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("th",{scope:"row"},"1"),l.a.createElement("td",null,"Mark"),l.a.createElement("td",null,"Otto"),l.a.createElement("td",null,"@mdo")),l.a.createElement("tr",null,l.a.createElement("th",{scope:"row"},"2"),l.a.createElement("td",null,"Jacob"),l.a.createElement("td",null,"Thornton"),l.a.createElement("td",null,"@fat")),l.a.createElement("tr",null,l.a.createElement("th",{scope:"row"},"3"),l.a.createElement("td",null,"Larry"),l.a.createElement("td",null,"the Bird"),l.a.createElement("td",null,"@twitter"))))}}]),a}(l.a.Component),v=function(e){Object(d.a)(a,e);var t=Object(E.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return l.a.createElement(m.cb,{responsive:!0,className:"mb-0"},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"#"),l.a.createElement("th",null,"Table heading"),l.a.createElement("th",null,"Table heading"),l.a.createElement("th",null,"Table heading"),l.a.createElement("th",null,"Table heading"),l.a.createElement("th",null,"Table heading"),l.a.createElement("th",null,"Table heading"))),l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("th",{scope:"row"},"1"),l.a.createElement("td",null,"Table cell"),l.a.createElement("td",null,"Table cell"),l.a.createElement("td",null,"Table cell"),l.a.createElement("td",null,"Table cell"),l.a.createElement("td",null,"Table cell"),l.a.createElement("td",null,"Table cell")),l.a.createElement("tr",null,l.a.createElement("th",{scope:"row"},"2"),l.a.createElement("td",null,"Table cell"),l.a.createElement("td",null,"Table cell"),l.a.createElement("td",null,"Table cell"),l.a.createElement("td",null,"Table cell"),l.a.createElement("td",null,"Table cell"),l.a.createElement("td",null,"Table cell")),l.a.createElement("tr",null,l.a.createElement("th",{scope:"row"},"3"),l.a.createElement("td",null,"Table cell"),l.a.createElement("td",null,"Table cell"),l.a.createElement("td",null,"Table cell"),l.a.createElement("td",null,"Table cell"),l.a.createElement("td",null,"Table cell"),l.a.createElement("td",null,"Table cell"))))}}]),a}(l.a.Component),O=function(e){Object(d.a)(a,e);var t=Object(E.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return l.a.createElement(m.cb,{size:"sm",className:"mb-0"},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"#"),l.a.createElement("th",null,"First Name"),l.a.createElement("th",null,"Last Name"),l.a.createElement("th",null,"Username"))),l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("th",{scope:"row"},"1"),l.a.createElement("td",null,"Mark"),l.a.createElement("td",null,"Otto"),l.a.createElement("td",null,"@mdo")),l.a.createElement("tr",null,l.a.createElement("th",{scope:"row"},"2"),l.a.createElement("td",null,"Jacob"),l.a.createElement("td",null,"Thornton"),l.a.createElement("td",null,"@fat")),l.a.createElement("tr",null,l.a.createElement("th",{scope:"row"},"3"),l.a.createElement("td",null,"Larry"),l.a.createElement("td",null,"the Bird"),l.a.createElement("td",null,"@twitter"))))}}]),a}(l.a.Component),N=function(e){Object(d.a)(a,e);var t=Object(E.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return l.a.createElement(m.cb,{striped:!0,className:"mb-0"},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"#"),l.a.createElement("th",null,"First Name"),l.a.createElement("th",null,"Last Name"),l.a.createElement("th",null,"Username"))),l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("th",{scope:"row"},"1"),l.a.createElement("td",null,"Mark"),l.a.createElement("td",null,"Otto"),l.a.createElement("td",null,"@mdo")),l.a.createElement("tr",null,l.a.createElement("th",{scope:"row"},"2"),l.a.createElement("td",null,"Jacob"),l.a.createElement("td",null,"Thornton"),l.a.createElement("td",null,"@fat")),l.a.createElement("tr",null,l.a.createElement("th",{scope:"row"},"3"),l.a.createElement("td",null,"Larry"),l.a.createElement("td",null,"the Bird"),l.a.createElement("td",null,"@twitter"))))}}]),a}(l.a.Component),y=function(e){return l.a.createElement(n.Fragment,null,l.a.createElement(u.a,{heading:"Regular Tables",subheading:"Tables are the backbone of almost all web applications.",icon:"pe-7s-drawer icon-gradient bg-happy-itmeo"}),l.a.createElement(o.a,{component:"div",transitionName:"TabsAnimation",transitionAppear:!0,transitionAppearTimeout:0,transitionEnter:!1,transitionLeave:!1},l.a.createElement(m.Z,null,l.a.createElement(m.u,{lg:"6"},l.a.createElement(m.g,{className:"main-card mb-3"},l.a.createElement(m.h,null,l.a.createElement(m.o,null,"Simple table"),l.a.createElement(b,null)))),l.a.createElement(m.u,{lg:"6"},l.a.createElement(m.g,{className:"main-card mb-3"},l.a.createElement(m.h,null,l.a.createElement(m.o,null,"Table bordered"),l.a.createElement(p,null)))),l.a.createElement(m.u,{lg:"6"},l.a.createElement(m.g,{className:"main-card mb-3"},l.a.createElement(m.h,null,l.a.createElement(m.o,null,"Table without border"),l.a.createElement(h,null)))),l.a.createElement(m.u,{lg:"6"},l.a.createElement(m.g,{className:"main-card mb-3"},l.a.createElement(m.h,null,l.a.createElement(m.o,null,"Table dark"),l.a.createElement(g,null)))),l.a.createElement(m.u,{lg:"6"},l.a.createElement(m.g,{className:"main-card mb-3"},l.a.createElement(m.h,null,l.a.createElement(m.o,null,"Table with hover"),l.a.createElement(f,null)))),l.a.createElement(m.u,{lg:"6"},l.a.createElement(m.g,{className:"main-card mb-3"},l.a.createElement(m.h,null,l.a.createElement(m.o,null,"Table responsive"),l.a.createElement(v,null)))),l.a.createElement(m.u,{lg:"6"},l.a.createElement(m.g,{className:"main-card mb-3"},l.a.createElement(m.h,null,l.a.createElement(m.o,null,"Table sizing"),l.a.createElement(O,null)))),l.a.createElement(m.u,{lg:"6"},l.a.createElement(m.g,{className:"main-card mb-3"},l.a.createElement(m.h,null,l.a.createElement(m.o,null,"Table striped"),l.a.createElement(N,null)))))))},w=a(260),j=a(269),k=a(261);t.default=function(e){var t=e.match;return l.a.createElement(n.Fragment,null,l.a.createElement(w.a,null),l.a.createElement("div",{className:"app-main"},l.a.createElement(j.a,null),l.a.createElement("div",{className:"app-main__outer"},l.a.createElement("div",{className:"app-main__inner"},l.a.createElement(r.b,{path:"".concat(t.url,"/regular-tables"),component:y})),l.a.createElement(k.b,null))))}},243:function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));var n=a(43),l=n.Fluent.model("Form",{remote:{path:"form",pullForm:!0}})},253:function(e,t,a){"use strict";a.d(t,"a",(function(){return m}));var n=a(297),l=a(0),r=a.n(l),c=a(14),o=a.n(c),m=function(e){var t=e.active,a=Object(l.useState)(t||!0),c=Object(n.a)(a,2),m=c[0],u=c[1];return r.a.createElement(l.Fragment,null,r.a.createElement("div",{className:o()("search-wrapper",{active:m})},r.a.createElement("div",{className:"input-holder"},r.a.createElement("input",{type:"text",className:"search-input"}),r.a.createElement("button",{onClick:function(){return u(!m)},className:"search-icon"},r.a.createElement("span",null))),r.a.createElement("button",{onClick:function(){return u(!m)},className:"close"})))}},260:function(e,t,a){"use strict";var n=a(0),l=a.n(n),r=a(14),c=a.n(r),o=a(192),m=a.n(o),u=a(223),s=a(253),i=a(40),d=a(5),E=a(39),b=Object(E.a)((function(){var e=function(){var e=Object(i.a)().themeStore;return Object(d.d)((function(){return{headerBackgroundColor:e.headerBackgroundColor,enableMobileMenuSmall:e.enableMobileMenuSmall,enableHeaderShadow:e.enableHeaderShadow}}))}(),t=e.headerBackgroundColor,a=e.enableMobileMenuSmall,n=e.enableHeaderShadow;return l.a.createElement(l.a.Fragment,null,l.a.createElement(m.a,{component:"div",className:c()("app-header",t,{"header-shadow":n}),transitionName:"HeaderAnimation",transitionAppear:!0,transitionAppearTimeout:1500,transitionEnter:!1,transitionLeave:!1},l.a.createElement(u.a,null),l.a.createElement("div",{className:c()("app-header__content",{"header-mobile-open":a})},l.a.createElement("div",{className:"app-header-left"},l.a.createElement(s.a,null)),l.a.createElement("div",{className:"app-header-right"}))))}));t.a=b},261:function(e,t,a){"use strict";a.d(t,"a",(function(){return u}));var n=a(175),l=a(176),r=a(178),c=a(177),o=a(0),m=a.n(o),u=function(e){Object(r.a)(a,e);var t=Object(c.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return m.a.createElement(o.Fragment,null,m.a.createElement("div",{className:"app-footer"},m.a.createElement("div",{className:"app-footer__inner"},m.a.createElement("div",{className:"app-footer-left"}),m.a.createElement("div",{className:"app-footer-right"},m.a.createElement("ul",{className:"nav"},m.a.createElement("li",{className:"nav-item"},m.a.createElement("a",{href:"https://docs.goatlab.io",className:"nav-link"},"Documentation")))))))}}]),a}(m.a.Component);t.b=u},269:function(e,t,a){"use strict";var n=a(0),l=a.n(n),r=a(14),c=a.n(r),o=a(13),m=a(339),u=a.n(m),s=[{icon:"pe-7s-diamond",label:"Elements",content:[{label:"Standard Buttons",to:"#/elements/buttons-standard"},{label:"Dropdowns",to:"#/elements/dropdowns"},{label:"Icons",to:"#/elements/icons"},{label:"Badges",to:"#/elements/badges-labels"},{label:"Cards",to:"#/elements/cards"},{label:"List Groups",to:"#/elements/list-group"},{label:"Navigation Menus",to:"#/elements/navigation"},{label:"Utilities",to:"#/elements/utilities"},{label:"Tabs",to:"#/components/tabs"},{label:"Notifications",to:"#/components/notifications"},{label:"Modals",to:"#/components/modals"},{label:"Progress Bar",to:"#/components/progress-bar"},{label:"Tooltips & Popovers",to:"#/components/tooltips-popovers"},{label:"Carousel",to:"#/components/carousel"},{label:"Maps",to:"#/components/maps"},{icon:"pe-7s-light",label:"Controls",to:"#/formsui/controls"},{icon:"pe-7s-eyedropper",label:"Layouts",to:"#/formsui/layouts"},{icon:"pe-7s-pendrive",label:"Validation",to:"#/formsui/validation"},{icon:"pe-7s-graph2",label:"Dashboard Boxes",to:"#/widgets/dashboard-boxes"},{icon:"pe-7s-graph2",label:"ChartJS",to:"#/charts/chartjs"},{icon:"pe-7s-rocket",label:"Dashboard Example",to:"#/dashboards/basic"}]}],i=a(5),d=a(39),E=a(208),b=Object(d.a)((function(){var e=function(){var e=Object(E.a)().resourceStore;return Object(i.d)((function(){return{resources:e.resources,fetchResources:e.fetchResources}}))}(),t=e.resources,a=e.fetchResources;Object(n.useEffect)((function(){a()}),[]);var r=[{icon:"pe-7s-share",label:"Forms",content:[]}];return t.forEach((function(e,t){r[0].content.push({label:e.title,to:"#/forms/".concat(e._id)})})),l.a.createElement(n.Fragment,null,l.a.createElement("h5",{className:"app-sidebar__heading"},"API"),l.a.createElement(u.a,{content:[{icon:"pe-7s-way",label:"Create form",to:"#/forms"}],activeLinkFromLocation:!0,className:"vertical-nav-menu",iconNamePrefix:"",classNameStateIcon:"pe-7s-angle-down"}),r[0].content.length>0&&l.a.createElement(u.a,{content:r,activeLinkFromLocation:!0,className:"vertical-nav-menu",iconNamePrefix:"",classNameStateIcon:"pe-7s-angle-down"}),l.a.createElement("h5",{className:"app-sidebar__heading"},"UI Components"),l.a.createElement(u.a,{content:s,activeLinkFromLocation:!0,className:"vertical-nav-menu",iconNamePrefix:"",classNameStateIcon:"pe-7s-angle-down"}))})),p=Object(o.h)(b),h=a(192),g=a.n(h),f=a(340),v=a.n(f),O=a(223),N=a(40),y=Object(d.a)((function(){var e=function(){var e=Object(N.a)().themeStore;return Object(i.d)((function(){return{backgroundColor:e.backgroundColor,enableBackgroundImage:e.enableBackgroundImage,toggleMobileSidebar:e.toggleMobileSidebar,enableSidebarShadow:e.enableSidebarShadow,backgroundImage:e.backgroundImage,backgroundImageOpacity:e.backgroundImageOpacity}}))}(),t=e.toggleMobileSidebar,a=e.backgroundColor,n=e.enableSidebarShadow,r=e.backgroundImageOpacity;return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"sidebar-mobile-overlay",onClick:t}),l.a.createElement(g.a,{component:"div",className:c()("app-sidebar",a,{"sidebar-shadow":n}),transitionName:"SidebarAnimation",transitionAppear:!0,transitionAppearTimeout:1500,transitionEnter:!1,transitionLeave:!1},l.a.createElement(O.a,null),l.a.createElement(v.a,null,l.a.createElement("div",{className:"app-sidebar__inner"},l.a.createElement(p,null))),l.a.createElement("div",{className:c()("app-sidebar-bg",r)})))}));t.a=y}}]);
//# sourceMappingURL=18.643c0b9b.chunk.js.map