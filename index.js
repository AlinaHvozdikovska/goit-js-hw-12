import{a as v,S as C,i as n}from"./assets/vendor-D3PmPE7A.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const p of r.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&a(p)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();async function g(o,e=1){const s=new URLSearchParams({key:"48339480-4f5c45a75f87f035650b36ee2",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:e});try{return(await v.get(`https://pixabay.com/api/?${s}`)).data}catch(a){throw new Error(a.response?a.response.status:"Network Error")}}const d=document.querySelector(".gallery"),L=new C(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});function m(o){const e=o.map(s=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${s.largeImageURL}">
            <img
            class="gallery-image"
            src="${s.webformatURL}"
            alt="${s.tags}"
            />
          </a>
          <div class="stat-container">
            <div>
                <span><b>Likes</b></span>
                <span>${s.likes}</span>
            </div>
            <div>
                <span><b>Views</b></span>
                <span>${s.views}</span>
            </div>
             <div>
                <span><b>Comments</b></span>
                <span>${s.comments}</b></span>
            </div>
             <div>
                <span><b>Downloads</b></span>
                <span>${s.downloads}</span>
            </div>
          </div>
        </li>
    `).join("");d.insertAdjacentHTML("beforeend",e),L.refresh()}const h=document.querySelector(".search-form"),y=document.querySelector(".loader"),i=document.querySelector(".load-btn");let f="",l=1,u=0,c=0;function b(){y.style.display="block"}function w(){y.style.display="none"}h.addEventListener("submit",async o=>{if(o.preventDefault(),d.innerHTML="",f=o.target.elements.search.value.trim().toLowerCase(),l=1,c=0,f===""){n.show({message:"Input field can not be empty. Please enter your message.",messageColor:"#ffffff",backgroundColor:"#ef4040",position:"topRight"});return}b(),i.style.display="none";try{const e=await g(f,l);if(u=e.totalHits,e.hits.length===0)n.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#ffffff",backgroundColor:"#ef4040",position:"topRight"});else{m(e.hits),c+=e.hits.length,i.style.display="block",l++;const s=d.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"}),c>=u&&(i.style.display="none",n.show({message:"We're sorry, but you've reached the end of search results.",messageColor:"#ffffff",backgroundColor:"#ef4040",position:"topRight"}))}}catch(e){n.show({message:`${e}`,messageColor:"#ffffff",backgroundColor:"#ef4040",position:"topRight"})}finally{w()}h.reset()});i.addEventListener("click",async()=>{b();try{const o=await g(f,l);if(o.hits.length>0){m(o.hits),c+=o.hits.length,l++;const e=d.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"}),c>=u&&(i.style.display="none",n.show({message:"We're sorry, but you've reached the end of search results.",messageColor:"#ef4040",position:"topRight"}))}else i.style.display="none"}catch(o){n.show({message:`${o}`,messageColor:"#ffffff",backgroundColor:"#ef4040",position:"topRight"})}finally{w()}});
//# sourceMappingURL=index.js.map
