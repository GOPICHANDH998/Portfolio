const {useState,useEffect,useRef,createElement:h}=React;

const DATA={
  name:"T. Gopichandh",
  roles:["Python Full Stack Developer","Flask &amp; React Builder","AI Enthusiast","Problem Solver"].map(s=>s.replace("&amp;","&")),
  email:"tattegopichand2004@gmail.com",phone:"+91-8341162065",
  github:"https://github.com/GOPICHANDH998",
  linkedin:"https://www.linkedin.com/in/tatte-gopichandh-35058a259",
  about:"I’m an aspiring Full Stack Python developer who enjoys turning ideas into intelligent, scalable web applications. I’m completing my B.Tech in Computer Science & Engineering and currently training in full stack development in Bengaluru, building with Python, SQL, Flask and React.",
  skills:{
    "Languages":["Python","JavaScript","SQL","HTML","CSS"],
    "Frameworks & Libraries":["React","Flask","Django (Basics)","OpenCV"],
    "Tools":["VS Code","MySQL Workbench","Git","GitHub"],
    "Office":["Word","PowerPoint","Excel"],
    "Soft Skills":["Leadership","Communication","Adaptability"]
  },
  projects:[
    {icon:"🌿",title:"AI-Powered Plant Disease Detection",tags:["Python","OpenCV","CNN","Flask"],links:[["Local Demo ↗","http://127.0.0.1:8000/"]],
     pts:["Detects plant diseases from uploaded leaf images.","Image preprocessing and classification with Python, OpenCV and a CNN-based deep learning model.","Trained and evaluated on a labeled plant-leaf dataset, analyzing prediction performance.","Integrated the trained model into a Flask web app for image upload and disease prediction."]},
    {icon:"💪",title:"Gym Fitness Website",tags:["React.js","CSS","Responsive"],links:[["GitHub Repo ↗","https://github.com/GOPICHANDH998/Gym-Fitness"]],
     pts:["Responsive web application built with reusable React.js components.","Layouts that work smoothly on mobile, tablet and desktop.","Clean, user-friendly interface using CSS and responsive design techniques."]}
  ],
  work:{role:"Python Full Stack Developer Trainee",org:"Pentagon Space · Bengaluru, India",date:"March 2026 – September 2026",
    pts:["Training in Python, SQL, HTML, CSS, JavaScript, React and Django (basics).","Building dynamic web applications with Flask, covering database design, efficient SQL queries and REST API integration.","Sharpening problem-solving and debugging skills and frontend–backend integration through practical projects."]},
  edu:[
    {t:"B.Tech, Computer Science & Engineering",o:"Gates Institute of Engineering and Technology, JNTUA",d:"2023 – 2026"},
    {t:"Diploma",o:"Government Polytechnic College",d:"2020 – 2023"},
    {t:"SSC",o:"Kallimatam M.P.L High School",d:"2016 – 2020"}
  ],
  certs:["Participated in Ripple-2024 and received a certificate","Online Soft Skills Training certificate","Paper Presentation certification","NPTEL certification in Cloud Computing (Jul–Oct 2025)"]
};

function Reveal({children,cls=""}){
  const ref=useRef(null);
  useEffect(()=>{
    const el=ref.current;
    if(!("IntersectionObserver" in window)){el.classList.add("in");return}
    const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){el.classList.add("in");io.disconnect()}},{threshold:.12});
    io.observe(el);return()=>io.disconnect();
  },[]);
  return h("div",{ref,className:"rev "+cls},children);
}

function Typing({words}){
  const [i,setI]=useState(0),[txt,setTxt]=useState(""),[del,setDel]=useState(false);
  useEffect(()=>{
    const w=words[i];
    const t=setTimeout(()=>{
      if(!del){setTxt(w.slice(0,txt.length+1));if(txt.length+1===w.length)setTimeout(()=>setDel(true),1100)}
      else{setTxt(w.slice(0,txt.length-1));if(txt.length-1===0){setDel(false);setI((i+1)%words.length)}}
    },del?40:80);
    return()=>clearTimeout(t);
  },[txt,del,i]);
  return h("div",{className:"role"},h("b",null,txt),h("span",{className:"cursor"}));
}

function Nav({theme,toggle}){
  const items=["About","Skills","Experience","Projects","Education","Contact"];
  return h("nav",null,h("div",{className:"wrap"},h("a",{href:"#top",className:"logo"},"TG"),
    
    h("div",{className:"links"},items.map(x=>h("a",{key:x,href:"#"+x.toLowerCase()},x))),
    h("button",{className:"tbtn",onClick:toggle,"aria-label":"Toggle theme"},theme==="dark"?"☀️":"🌙")
  ));
}

function Hero(){
  return h("section",{className:"hero",id:"top"},h("div",{className:"wrap"},
    h("div",null,
      h("div",{className:"hi"},"Hello, I’m"),
      h("h1",null,DATA.name),
      h(Typing,{words:DATA.roles}),
      h("p",{className:"sub"},"I build dynamic, responsive web apps and intelligent solutions with Python, Flask, SQL and React."),
      h("div",{className:"cta"},
        h("a",{className:"btn p",href:"#projects"},"View Projects"),
        h("a",{className:"btn",href:"#contact"},"Hire Me"),
        h("a",{className:"btn",href:DATA.github,target:"_blank",rel:"noopener"},"GitHub ↗")
      )),
    h("div",{className:"avatar"},h("img",{src:"images/gopi.webp",alt:"Portrait of T. Gopichandh"}))
  ));
}

function About(){
  return h("section",{id:"about"},h("div",{className:"wrap"},h(Reveal,null,
    h("h2",null,"About Me"),
    h("div",{className:"card",style:{marginTop:20}},
      h("p",null,DATA.about),
      h("p",{style:{marginTop:12,color:"var(--muted)"}},"Career goal: an entry-level Full Stack Python Development role where I can apply Python, SQL and problem-solving skills while continuously growing."),
      h("div",{className:"stats"},
        [["2","Projects"],["6 mo","Training"],["4+","Certificates"]].map(([a,b])=>h("div",{className:"stat",key:b},h("b",null,a),h("span",null,b)))
      )))));
}

function Skills(){
  const keys=["All",...Object.keys(DATA.skills)];
  const [f,setF]=useState("All");
  const shown=Object.entries(DATA.skills).filter(([k])=>f==="All"||k===f);
  return h("section",{id:"skills"},h("div",{className:"wrap"},h(Reveal,null,
    h("h2",null,"Skills"),
    h("p",{className:"sub"},"Technologies and tools I work with."),
    h("div",{className:"tabs"},keys.map(k=>h("button",{key:k,className:"tab"+(f===k?" on":""),onClick:()=>setF(k)},k))),
    h("div",{className:"grid"},shown.map(([k,v])=>h("div",{className:"card",key:k},h("b",null,k),
      h("div",{className:"chips"},v.map(s=>h("span",{className:"chip",key:s},s))))))
  )));
}

function Experience(){
  const w=DATA.work;
  return h("section",{id:"experience"},h("div",{className:"wrap"},h(Reveal,null,
    h("h2",null,"Experience"),
    h("div",{className:"tl",style:{marginTop:28}},h("div",{className:"item"},
      h("div",{className:"date"},w.date),
      h("h3",null,w.role),h("div",{style:{color:"var(--muted)"}},w.org),
      h("ul",{className:"pts"},w.pts.map(p=>h("li",{key:p},p)))))
  )));
}

function Projects(){
  return h("section",{id:"projects"},h("div",{className:"wrap"},h(Reveal,null,
    h("h2",null,"Projects"),
    h("p",{className:"sub"},"Things I’ve built while learning."),
    h("div",{className:"grid"},DATA.projects.map(p=>h("article",{className:"card proj",key:p.title},
      h("div",{className:"ico"},p.icon),
      h("h3",null,p.title),
      h("div",{className:"chips"},p.tags.map(t=>h("span",{className:"chip",key:t},t))),
      h("ul",{className:"pts"},p.pts.map(x=>h("li",{key:x},x))),p.links&&h("div",{className:"cta",style:{marginTop:16}},p.links.map(([t,u])=>h("a",{className:"btn",key:u,href:u,target:"_blank",rel:"noopener"},t))))))
  )));
}

function Education(){
  return h("section",{id:"education"},h("div",{className:"wrap"},h(Reveal,null,
    h("h2",null,"Education & Certifications"),
    h("div",{className:"grid",style:{marginTop:28,alignItems:"start"}},
      h("div",{className:"tl"},DATA.edu.map(e=>h("div",{className:"item",key:e.t},
        h("div",{className:"date"},e.d),h("b",null,e.t),h("div",{style:{color:"var(--muted)"}},e.o)))),
      h("div",{style:{display:"grid",gap:12}},DATA.certs.map(c=>h("div",{className:"card cert",key:c,style:{padding:16}},h("span",null,"🏅"),h("span",null,c))))
    )
  )));
}

function Contact(){
  const [copied,setCopied]=useState(false);
  const copy=()=>{try{navigator.clipboard.writeText(DATA.email).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),1800)})}catch(e){}};
  const L=[["✉️","Email",DATA.email,"mailto:"+DATA.email],["📞","Phone",DATA.phone,"tel:"+DATA.phone.replace(/-/g,"")],["💼","LinkedIn","tatte-gopichandh",DATA.linkedin],["🐙","GitHub","GOPICHANDH998",DATA.github]];
  return h("section",{id:"contact"},h("div",{className:"wrap"},h(Reveal,null,
    h("h2",null,"Get in Touch"),
    h("p",{className:"sub"},"Open to entry-level Full Stack Python opportunities. Let’s build something together."),
    h("div",{className:"contact"},L.map(([i,a,b,u])=>h("a",{className:"card",key:a,href:u,target:u.startsWith("http")?"_blank":undefined,rel:"noopener"},
      h("span",{style:{fontSize:"1.5rem"}},i),h("small",null,a),h("b",null,b)))),
    h("div",{className:"cta"},h("button",{className:"btn",onClick:copy},copied?"Copied ✓":"Copy email"))
  )));
}

function App(){
  const [theme,setTheme]=useState(()=>{
    try{const s=localStorage.getItem("theme");if(s)return s}catch(e){}
    return window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";
  });
  useEffect(()=>{document.documentElement.setAttribute("data-theme",theme);try{localStorage.setItem("theme",theme)}catch(e){}},[theme]);
  return h(React.Fragment,null,
    h(Nav,{theme,toggle:()=>setTheme(theme==="dark"?"light":"dark")}),
    h("main",null,h(Hero),h(About),h(Skills),h(Experience),h(Projects),h(Education),h(Contact)),
    h("footer",null,"© 2026 T. Gopichandh · Built with HTML, CSS, JavaScript & React"));
}
ReactDOM.createRoot(document.getElementById("root")).render(h(App));
