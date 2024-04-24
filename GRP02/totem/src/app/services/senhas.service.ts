import { Injectable, input } from '@angular/core';
import { bindCallback, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SenhasService {
  SenhaAtendidasPrio:String ='';
  SenhaAtendidasTotal: Number = 0;
  Senhaemitidas:number= 0;
  SenhaemitidasPrio:String = '';

  atendidasPri:number = 0;
  atendidasG:number = 0;
  atendidasE:number = 0;

  
  naG:number = 0;
  naPri:number =0;
  naE:number = 0;

  tSenhasPri:String[] = [];
  tSenhasE:String[] = [];
  tSenhasG:String[] = [];

  p:number = 0;
  e:number = 0;
  g:number = 0;
  i:number = 0

  
  guicheUm = {
    'numero': 0,
    'Tipo': '',
    'livre' : false,
    'guiche' : 1,
    'Ta': 0
  }
  guicheDois = {
    'numero': 0,
    'Tipo': '',
    'livre' : false,
    'guiche' : 2,
    'Ta': 0
  }
  guicheTres = {
    'numero': 0,
    'Tipo': '',
    'livre' : false,
    'guiche' : 3,
    'Ta': 0
  }

  senhasPri = [{
      'numero': 0,
      'Dia': new Date().getDate().toString().padStart(2,"0") ,
      'mes': (new Date().getMonth()+1).toString().padStart(2,"0") ,
      'Ano': new Date().getFullYear().toString().substring(2,4),
      'Tipo':'Senha Teste',
      'atendida': false,
      'He': new Date().getHours(),
      'Me': new Date().getMinutes(),
      'Se': new Date().getSeconds(),
      'Ha': 0,
      'Ma': 0,
      'Sa': 0,
      'Ta': 0,
      'guiche': 0

  }
]

  senhasG = [{
      'numero': 0,
      'Dia': new Date().getDate().toString().padStart(2,"0") ,
      'mes': (new Date().getMonth()+1).toString().padStart(2,"0") ,
      'Ano': new Date().getFullYear().toString().substring(2,4),
      'Tipo':'SenhaTeste',
      'atendida': false,
      'He': new Date().getHours(),
      'Me': new Date().getMinutes(),
      'Se': new Date().getSeconds(),
      'Ha': 0,
      'Ma': 0,
      'Sa': 0,
      'Ta': 0,
      'guiche': 0
     
  }
]
  senhasE = [{
    'numero': 0,
    'Dia': new Date().getDate().toString().padStart(2,"0") ,
    'mes': (new Date().getMonth()+1).toString().padStart(2,"0") ,
    'Ano': new Date().getFullYear().toString().substring(2,4),
    'Tipo':'SenhaTeste',
    'atendida': false,
    'He': new Date().getHours(),
    'Me': new Date().getMinutes(),
    'Se': new Date().getSeconds(),
    'Ha': 0,
    'Ma': 0,
    'Sa': 0,
    'Ta': 0,
    'guiche': 0
    
  }
]
  totalPri:number = this.senhasPri.length;
  totalG:number = this.senhasG.length;
  totalE:number = this.senhasE.length;

  senhaAtual = this.senhasPri[this.p];
  hSenhas1 = this.senhasPri[this.p];
  hSenhas2 = this.senhasPri[this.p];
  
  constructor() { }

  

  guicheChoose(){

    if (this.guicheUm.livre === false){
      this.guicheUm.numero = this.senhaAtual.numero;
      this.guicheUm.Tipo = this.senhaAtual.Tipo;
      this.guicheUm.Ta = this.senhaAtual.Ta;
      this.guicheUm.livre = true;
      setTimeout(() => {
        this.guicheUm.numero = 0
        this.guicheUm.Tipo = ''
        this.guicheUm.Ta = 0
        this.guicheUm.livre = false 
        
      }, (60000*this.guicheUm.Ta));

    }
    else if (this.guicheUm.livre === true && this.guicheDois.livre === false){
      this.guicheDois.numero = this.senhaAtual.numero;
      this.guicheDois.Tipo = this.senhaAtual.Tipo
      this.guicheDois.Ta = this.senhaAtual.Ta;
      this.guicheDois.livre = true;
      setTimeout(() => {
        this.guicheDois.numero = 0
        this.guicheDois.Tipo = ''
        this.guicheDois.Ta = 0
        this.guicheDois.livre = false 
        
      }, (60000*this.guicheDois.Ta));
    }
    else if(this.guicheUm.livre === true && this.guicheDois.livre === true && this.guicheTres.livre === false) {
      this.guicheTres.numero = this.senhaAtual.numero;
      this.guicheTres.Tipo = this.senhaAtual.Tipo
      this.guicheTres.Ta = this.senhaAtual.Ta;
      this.guicheTres.livre = true;
      setTimeout(() => {
        this.guicheTres.numero = 0
        this.guicheTres.Tipo = ''
        this.guicheTres.Ta = 0
        this.guicheTres.livre = false 
        
      }, (60000*this.guicheTres.Ta));
    }
    
    }

    esvaziarGuiche1(){
      this.guicheUm.numero = 0
      this.guicheUm.Tipo = ''
      this.guicheUm.Ta = 0
      this.guicheUm.livre = false 
     
    }
    esvaziarGuiche2(){
      this.guicheDois.numero = 0
      this.guicheDois.Tipo = ''
      this.guicheDois.Ta = 0
      this.guicheDois.livre = false 
    
    }
    esvaziarGuiche3(){
      this.guicheTres.numero = 0
      this.guicheTres.Tipo = ''
      this.guicheDois.Ta = 0
      this.guicheTres.livre = false 
  
    }
  TMSE(){
    let i = Math.floor(Math.random() *  100)
    let num
    if (i <=95){
      num = 1
    }else{
      num =5
    }
    return(num)
  }

  addSenhasPri(){
    this.senhasPri.push(
       {
       'numero': this.totalPri,
       'Dia': new Date().getDate().toString().padStart(2,"0") ,
       'mes': (new Date().getMonth()+1).toString().padStart(2,"0") ,
       'Ano': new Date().getFullYear().toString().substring(2,4),
       'Tipo':'SP',
       'atendida': false,
       'He': new Date().getHours(),
       'Me': new Date().getMinutes(),
       'Se': new Date().getSeconds(),
       'Ha': 0,
       'Ma': 0,
       'Sa': 0,
       'Ta': 0,
       'guiche': 0
       }
     ) 
     this.totalPri = this.senhasPri.length;
     this.Senhaemitidas = this.totalE + this.totalG + this.totalPri;
     this.SenhaemitidasPrio = this.totalPri+" Prioritárias, "+this.totalE+" Exames, "+this.totalG+" Gerais.";
     console.log("Senha prioritaria recebida")
     console.log(this.senhasPri)
   }
  addSenhasG(){
    this.senhasG.push(
      {
        'numero': this.totalG,
        'Dia': new Date().getDate().toString().padStart(2,"0") ,
        'mes': (new Date().getMonth()+1).toString().padStart(2,"0") ,
        'Ano': new Date().getFullYear().toString().substring(2,4),
        'Tipo':'SG',
        'atendida': false,
        'He': new Date().getHours(),
        'Me': new Date().getMinutes(),
        'Se': new Date().getSeconds(),
        'Ha': 0,
        'Ma': 0,
        'Sa': 0,
        'Ta': 0,
        'guiche': 0
        }
    )
    this.totalG =this.senhasG.length 
    this.Senhaemitidas = this.totalE + this.totalG + this.totalPri;
    this.SenhaemitidasPrio = this.totalPri+" Prioritárias, "+this.totalE+" Exames, "+this.totalG+" Gerais."
    console.log("Senha geral recebida")
    console.log(this.senhasG)
   }
   addSenhasE(){
    this.senhasE.push(
      {
        'numero': this.totalE,
        'Dia': new Date().getDate().toString().padStart(2,"0") ,
        'mes': (new Date().getMonth()+1).toString().padStart(2,"0") ,
        'Ano': new Date().getFullYear().toString().substring(2,4),
        'Tipo':'SE',
        'atendida': false,
        'He': new Date().getHours(),
        'Me': new Date().getMinutes(),
        'Se': new Date().getSeconds(),
        'Ha': 0,
        'Ma': 0,
        'Sa': 0,
        'Ta': 0,
        'guiche': 0
        }
    )
    this.totalE = this.senhasE.length
    this.Senhaemitidas = this.totalE + this.totalG + this.totalPri;
    this.SenhaemitidasPrio = this.totalPri+" Prioritárias, "+this.totalE+" Exames, "+this.totalG+" Gerais."
    console.log("Senha exame recebida")
      console.log(this.senhasE)
  

    }
    //
    //FUNÇÃO ATENDER SENHA
    //
    atenderSenha(){
     this.naG = this.totalG - this.atendidasG;
     this.naPri =this.totalPri - this.atendidasPri; 
     this.naE = this.totalE - this.atendidasE;
     if(this.guicheUm.livre === true && this.guicheDois.livre === true && this.guicheTres.livre === true){
      console.log("todos guiches cheios, aguarde")
     }else{
     // ATENDER SENHA PRIO
     if (this.senhaAtual == this.senhasPri[this.p]){
       if (this. naE == 0 && this.naG == 0 && this.naPri == 0){
         console.log("Sem senhas proximas")
       }else{
         if (this.senhaAtual == this.senhasPri[this.p] && this.naPri == 1 && this.naE == 0 && this.naG == 0){
           console.log("sem senhas proximas")
         }
         else if (this.senhaAtual == this.senhasPri[this.p] && this.naE == 0 && this.naG == 0){
          this.guicheChoose()
           this.senhasPri[this.p].atendida = true
           this.senhasPri[this.p].Ta = Math.floor(Math.random() * (15 - 5) + 5)
           this.senhasPri[this.p].Ha = new Date().getHours()
           this.senhasPri[this.p].Ma = new Date().getMinutes()
           this.senhasPri[this.p].Sa = new Date().getSeconds()
           this.guicheChoose()
           if (this.guicheUm.Tipo == this.senhasPri[this.p].Tipo && this.guicheUm.numero == this.senhasPri[this.p].numero){
            this.senhasPri[this.p].guiche = this.guicheUm.guiche
           } else if(this.guicheDois.Tipo == this.senhasPri[this.p].Tipo && this.guicheDois.numero == this.senhasPri[this.p].numero){
            this.senhasPri[this.p].guiche = this.guicheDois.guiche
           }else if(this.guicheTres.Tipo == this.senhasPri[this.p].Tipo && this.guicheTres.numero == this.senhasPri[this.p].numero){
            this.senhasPri[this.p].guiche = this.guicheTres.guiche
           }
           this.atendidasPri++
           this.p++
           this.senhaAtual = this.senhasPri[this.p]
         }
         else if (this.senhaAtual == this.senhasPri[this.p] && this.naE == 0){
          this.senhasPri[this.p].atendida = true
          this.senhasPri[this.p].Ta = Math.floor(Math.random() * (15 - 5) + 5)
          this.senhasPri[this.p].Ha = new Date().getHours()
          this.senhasPri[this.p].Ma = new Date().getMinutes()
          this.senhasPri[this.p].Sa = new Date().getSeconds()
          this.atendidasPri++
          this.guicheChoose()
          if (this.guicheUm.Tipo == this.senhasPri[this.p].Tipo && this.guicheUm.numero == this.senhasPri[this.p].numero){
            this.senhasPri[this.p].guiche = this.guicheUm.guiche
           } else if(this.guicheDois.Tipo == this.senhasPri[this.p].Tipo && this.guicheDois.numero == this.senhasPri[this.p].numero){
            this.senhasPri[this.p].guiche = this.guicheDois.guiche
           }else if(this.guicheTres.Tipo == this.senhasPri[this.p].Tipo && this.guicheTres.numero == this.senhasPri[this.p].numero){
            this.senhasPri[this.p].guiche = this.guicheTres.guiche
           }
          this.p++
          this.senhaAtual = this.senhasG[this.g]
        }else{
        
        this.senhasPri[this.p].atendida = true
        this.senhasPri[this.p].Ta = Math.floor(Math.random() * (15 - 5) + 5)
        this.senhasPri[this.p].Ha = new Date().getHours()
        this.senhasPri[this.p].Ma = new Date().getMinutes()
        this.senhasPri[this.p].Sa = new Date().getSeconds()
        this.atendidasPri++
        this.guicheChoose()
        if (this.guicheUm.Tipo == this.senhasPri[this.p].Tipo && this.guicheUm.numero == this.senhasPri[this.p].numero){
          this.senhasPri[this.p].guiche = this.guicheUm.guiche
         } else if(this.guicheDois.Tipo == this.senhasPri[this.p].Tipo && this.guicheDois.numero == this.senhasPri[this.p].numero){
          this.senhasPri[this.p].guiche = this.guicheDois.guiche
         }else if(this.guicheTres.Tipo == this.senhasPri[this.p].Tipo && this.guicheTres.numero == this.senhasPri[this.p].numero){
          this.senhasPri[this.p].guiche = this.guicheTres.guiche
         }
        this.p++
        this.senhaAtual = this.senhasE[this.e]
        } 
} 
 }
  // ATENDER SENHA EXAMES
  else if (this.senhaAtual == this.senhasE[this.e]){
    if (this. naPri == 0 && this.naG == 0 && this.naE == 0){
      console.log("Sem senhas proximas")
    }else{
      if (this.senhaAtual == this.senhasE[this.e] && this.naPri == 0 && this.naE == 1 && this.naG == 0){
        console.log("sem senhas proximas")
      }
      else if (this.senhaAtual == this.senhasE[this.e] && this.naPri == 0 && this.naG == 0){
        this.senhasE[this.e].atendida = true
        this.senhasE[this.e].Ta = this.TMSE()
        this.senhasE[this.e].Ha = new Date().getHours()
        this.senhasE[this.e].Ma = new Date().getMinutes()
        this.senhasE[this.e].Sa = new Date().getSeconds()
        this.guicheChoose()
        if (this.guicheUm.Tipo == this.senhasE[this.e].Tipo && this.guicheUm.numero == this.senhasE[this.e].numero){
          this.senhasE[this.e].guiche = this.guicheUm.guiche
         } else if(this.guicheDois.Tipo == this.senhasE[this.e].Tipo && this.guicheDois.numero == this.senhasE[this.e].numero){
          this.senhasE[this.e].guiche = this.guicheDois.guiche
         }else if(this.guicheTres.Tipo == this.senhasE[this.e].Tipo && this.guicheTres.numero == this.senhasE[this.e].numero){
          this.senhasE[this.e].guiche = this.guicheTres.guiche
         }
        this.atendidasE++
        this.e++
        this.senhaAtual = this.senhasE[this.e]
      }
    else if (this.senhaAtual == this.senhasE[this.e] && this.naPri == 0){
      this.senhasE[this.e].Ta = this.TMSE()
      this.senhasE[this.e].Ha = new Date().getHours()
      this.senhasE[this.e].Ma = new Date().getMinutes()
      this.senhasE[this.e].Sa = new Date().getSeconds()
      this.senhasE[this.e].atendida = true
      this.guicheChoose()
      if (this.guicheUm.Tipo == this.senhasE[this.e].Tipo && this.guicheUm.numero == this.senhasE[this.e].numero){
        this.senhasE[this.e].guiche = this.guicheUm.guiche
       } else if(this.guicheDois.Tipo == this.senhasE[this.e].Tipo && this.guicheDois.numero == this.senhasE[this.e].numero){
        this.senhasE[this.e].guiche = this.guicheDois.guiche
       }else if(this.guicheTres.Tipo == this.senhasE[this.e].Tipo && this.guicheTres.numero == this.senhasE[this.e].numero){
        this.senhasE[this.e].guiche = this.guicheTres.guiche
       }
      this.atendidasE++
      this.e++
      this.senhaAtual = this.senhasG[this.g]
    }else{
      this.senhasE[this.e].atendida = true
      this.senhasE[this.e].Ta = this.TMSE()
      this.senhasE[this.e].Ha = new Date().getHours()
      this.senhasE[this.e].Ma = new Date().getMinutes()
      this.senhasE[this.e].Sa = new Date().getSeconds()
      this.guicheChoose()
      if (this.guicheUm.Tipo == this.senhasE[this.e].Tipo && this.guicheUm.numero == this.senhasE[this.e].numero){
        this.senhasE[this.e].guiche = this.guicheUm.guiche
       } else if(this.guicheDois.Tipo == this.senhasE[this.e].Tipo && this.guicheDois.numero == this.senhasE[this.e].numero){
        this.senhasE[this.e].guiche = this.guicheDois.guiche
       }else if(this.guicheTres.Tipo == this.senhasE[this.e].Tipo && this.guicheTres.numero == this.senhasE[this.e].numero){
        this.senhasE[this.e].guiche = this.guicheTres.guiche
       }
      this.atendidasE++
      this.e++
      this.senhaAtual = this.senhasPri[this.p]
  }
}
  }

  //ATENDER SENHA GERAL
  else if (this.senhaAtual == this.senhasG[this.g]){

    if (this. naPri == 0 && this.naE == 0 && this.naG == 0){
      console.log("Sem senhas proximas")
    }else{
      if (this.senhaAtual == this.senhasG[this.g] && this.naPri == 0 && this.naE == 0 && this.naG == 1){
        console.log("sem senhas proximas")
      }
      else if (this.senhaAtual == this.senhasG[this.g] && this.naPri == 0 && this.naE == 0){
        this.senhasG[this.g].atendida = true
        this.senhasG[this.g].Ta = Math.floor(Math.random() * (8 - 3) + 3)
        this.senhasG[this.g].Ha = new Date().getHours()
        this.senhasG[this.g].Ma = new Date().getMinutes()
        this.senhasG[this.g].Sa = new Date().getSeconds()
        this.guicheChoose()
        if (this.guicheUm.Tipo == this.senhasG[this.g].Tipo && this.guicheUm.numero == this.senhasG[this.g].numero){
          this.senhasG[this.g].guiche = this.guicheUm.guiche
         } else if(this.guicheDois.Tipo == this.senhasG[this.g].Tipo && this.guicheDois.numero == this.senhasG[this.g].numero){
          this.senhasG[this.g].guiche = this.guicheDois.guiche
         }else if(this.guicheTres.Tipo == this.senhasG[this.g].Tipo && this.guicheTres.numero == this.senhasG[this.g].numero){
          this.senhasG[this.g].guiche = this.guicheTres.guiche
         }
        this.atendidasG++
        this.g++
        this.senhaAtual = this.senhasG[this.g]
      }
      
    else if ( this.senhaAtual == this.senhasG[this.g] && this.naPri == 0){
      this.senhasG[this.g].atendida = true
      this.senhasG[this.g].Ta = Math.floor(Math.random() * (8 - 3) + 3)
      this.senhasG[this.g].Ha = new Date().getHours()
      this.senhasG[this.g].Ma = new Date().getMinutes()
      this.senhasG[this.g].Sa = new Date().getSeconds()
      this.guicheChoose()
      if (this.guicheUm.Tipo == this.senhasG[this.g].Tipo && this.guicheUm.numero == this.senhasG[this.g].numero){
        this.senhasG[this.g].guiche = this.guicheUm.guiche
       } else if(this.guicheDois.Tipo == this.senhasG[this.g].Tipo && this.guicheDois.numero == this.senhasG[this.g].numero){
        this.senhasG[this.g].guiche = this.guicheDois.guiche
       }else if(this.guicheTres.Tipo == this.senhasG[this.g].Tipo && this.guicheTres.numero == this.senhasG[this.g].numero){
        this.senhasG[this.g].guiche = this.guicheTres.guiche
       }
      this.atendidasG++
      this.g++
      this.senhaAtual = this.senhasE[this.e]
    }else{
      this.senhasG[this.g].atendida = true
      this.senhasG[this.g].Ta = Math.floor(Math.random() * (8 - 3) + 3)
      this.senhasG[this.g].Ha = new Date().getHours()
      this.senhasG[this.g].Ma = new Date().getMinutes()
      this.senhasG[this.g].Sa = new Date().getSeconds()
      this.guicheChoose()
      if (this.guicheUm.Tipo == this.senhasG[this.g].Tipo && this.guicheUm.numero == this.senhasG[this.g].numero){
        this.senhasG[this.g].guiche = this.guicheUm.guiche
       } else if(this.guicheDois.Tipo == this.senhasG[this.g].Tipo && this.guicheDois.numero == this.senhasG[this.g].numero){
        this.senhasG[this.g].guiche = this.guicheDois.guiche
       }else if(this.guicheTres.Tipo == this.senhasG[this.g].Tipo && this.guicheTres.numero == this.senhasG[this.g].numero){
        this.senhasG[this.g].guiche = this.guicheTres.guiche
       }
      this.atendidasG++
      this.g++
      this.senhaAtual = this.senhasPri[this.p]
  }
} 
}}
this.SenhaAtendidasPrio = this.atendidasPri+" Prioritárias, "+this.atendidasE+" Exames, "+this.atendidasG+" Gerais." ;
this.SenhaAtendidasTotal = this.atendidasE + this.atendidasG + this.atendidasPri;
}

tempoMedioPrio(){
  let tm = this.senhasPri.map((prio)=>{return(prio.Ta)})
  let soma = 0;
  for(let i=0;i<tm.length;i++){
    soma+=tm[i]
  }
  return(
    Math.floor(soma/tm.length)
  )
}
tempoMedioE(){
  let tm = this.senhasE.map((prio)=>{return(prio.Ta)})
  let soma = 0;
  for(let i=0;i<tm.length;i++){
    soma+=tm[i]
  }
  return(
    Math.floor(soma/tm.length)
  )
}
tempoMedioG(){
  let tm = this.senhasG.map((prio)=>{return(prio.Ta)})
  let soma = 0;
  for(let i=0;i<tm.length;i++){
    soma+=tm[i]
  }
  return(
    Math.floor(soma/tm.length)
  )
}

}








