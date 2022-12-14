let current =0;
    
    async function getData(){
      current++;
      if(current< 7 ){        
      const api_url= "https://swapi.dev/api/planets/?page=" + current;
      const response= await fetch(api_url);
      const data = await response.json(); 
      
      let planetas = [];
        for(var i= 0 ; i<data.results.length; i++){          
          const t= data.results[i];
          const p = new Planeta(t.name, t.rotation_period, t.gravity ,t.orbital_period, t.population);
          
          planetas.push(p);           
        }
      sacarCarga(current); 
      crearPlanetas(planetas);
      boton();
      } 
      else{window.alert("Ya se mostaron todos los planetas");sacarCarga(current);}     
    }
    
    getData();
    
    function crearPlanetas(planetas){
      for(var i =0 ; i < planetas.length; i++){
        planetas[i].Mostrar();
      }

    }
    function boton(){ 
      //Crear boton
      var buton = document.createElement("button"); buton.setAttribute("id", "buton");
      var botonText = document.createElement("h1"); botonText.textContent = "LOAD";  
      buton.appendChild(botonText);
      document.getElementById('main').appendChild(buton);

      buton.addEventListener ("click", function() {
        //Buscar la siguiente pagina.
        
        document.getElementById("buton").remove();
        //Animacion cargando.        
        cargando();
        
        getData();
        
        
      });

    }
    function sacarCarga(x){
      if(x!=1){
      document.getElementById("contenedor").remove();
      }
    }
    function cargando(){
      //Animacion en css.
      const element =  document.createElement("div"); element.setAttribute("id", "contenedor");
      const carga = document.createElement("div"); carga.setAttribute("id", "carga");
      element.appendChild(carga);
      document.getElementById("main").appendChild(element);    

    }

    class Planeta{
      

      constructor(name,rotPer, grav, orbPer,pop){
        this.name= name;
        this.rotPer= rotPer
        this.grav = grav;
        this.orbPer= orbPer;
        this.pop= pop; 
      }
      
      Mostrar(){ 
        //muestra los valores en formatos legibles.
        this.resumirVal(); 
        //div de la carta.        
        var carta = document.createElement("div"); carta.setAttribute("class", "carta");  
        //Contiene el titulo
        var titCont= document.createElement("div"); titCont.setAttribute("id","titCont");
        var titulo = document.createElement("h2"); titulo.textContent = this.name;
        titCont.appendChild(titulo);
        carta.appendChild(titCont);
        // Div que Contiene todos las stats.
        var contStats =document.createElement("div"); contStats.setAttribute("id", "contStats");
        
        //Izquierda.
        var columIzq = this.HacerColumna("Rotation Period", this.rotPer, "Orbital Period", this.orbPer);
        columIzq.setAttribute("id", "columIzq");

        contStats.appendChild(columIzq);

        //Medio.
        
        var columMit = document.createElement("div"); columMit.setAttribute("id", "columMit");
        var img = document.createElement("img"); img.src = "Planet.png" ;
        columMit.appendChild(img);
        contStats.appendChild(columMit);

        //Derecha
        var columDer = this.HacerColumna("Gravedad", this.grav, "Population", this.pop);
        columDer.setAttribute("id", "columDer");
       
        contStats.appendChild(columDer); 

        carta.appendChild(contStats);

        document.getElementById('main').appendChild(carta);  
      }
      HacerColumna(nombre1, dato1, nombre2, dato2){
        //Div Columna 
        var Columna= document.createElement("div"); 
          // Primera Stat
        var PrimerStat= document.createElement("div"); PrimerStat.setAttribute("class", "PrimerStat");
        PrimerStat.textContent = nombre1;
        var PrimerStatD = document.createElement("h3"); PrimerStatD.textContent = dato1;
        PrimerStat.appendChild(PrimerStatD);
          // Segunda Stat
        var SegundaStat= document.createElement("div"); SegundaStat.setAttribute("class", "SegundaStat");
        
        var SegundaStatD = document.createElement("h3"); SegundaStatD.textContent = dato2;
        SegundaStat.appendChild(SegundaStatD);
        var SegundaStatT= document.createElement("p"); SegundaStatT.textContent =  nombre2;
        SegundaStat.appendChild(SegundaStatT);
        
        Columna.appendChild(PrimerStat);
        Columna.appendChild(SegundaStat);

        return Columna
      }
      resumirVal(){
        // Gravity
        if(this.grav.length > 15){
          //Quedarse solo con la Gravedad Standard.
          const text = this.grav.split(",");
          const t2 = text[1].split("(");
          this.grav = t2[0];
        }
        this.grav = this.grav.replace("unknown", "UNK" );
        this.name = this.name.replace("unknown", "UNK" );
        this.orbPer = this.orbPer.replace("unknown", "UNK" );
        this.rotPer = this.rotPer.replace("unknown", "UNK");
        this.pop = this.pop.replace("unknown", "UNK");
        this.grav = this.grav.replace("standard", "Std");
        
        //Population
       
        let medida=[" ","K","M","B","T","C"];
        
        if(!isNaN(this.pop)){          
          let exp = Math.floor(Math.log(this.pop)/Math.log(1000));
          this.pop = this.pop / (Math.pow (1000, exp)) + " " + medida[exp];
        }          
        
        }
      
      
    }

