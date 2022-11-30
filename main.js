// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  //console.log('Dentro de funcion: dnaBases[Math.floor(Math.random() * 4)]-> '+ dnaBases[Math.floor(Math.random() * 4)])
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (num, ArrayDNA)=>{
  return {
    specimenNum :num,
    dna: ArrayDNA, 
    mutate(){      
      const index = Math.floor(Math.random() * (this.dna.length-4));      
      let BaseDna = this.dna[index];      
      let mutateDnaBase = returnRandBase();     
      while (BaseDna===mutateDnaBase){
        mutateDnaBase = returnRandBase();
      }
      this.dna[index] = mutateDnaBase;
      return this.dna;
    },
    compareDNA(pAequor){
      let count = 0;
      for (let i = 0; i<this.dna.length; i++){
        if (pAequor.dna[i]===this.dna[i]){
          count++;
        }
      }
      const porcentage=Math.round(count*100/15);      
      return (`Specimen #1 and Specimen #2 have ${porcentage}% DNA in common.`)
    },
    willLikelySurvive(){
      let count=0;
      this.dna.forEach(element => {
        if (element==='C' || element==='G'){
          count++;
        }        
      });
      if (count>=9){
        return true;
      }
      return false;
    }
  }

}


//create 30 instances of pAequor that can survive in their natural environment. 
let pAequorSurvivor =[];
let i = 1;
while (pAequorSurvivor.length<30){  
  const strand = mockUpStrand();
  const pStrand = pAequorFactory(i, strand);
  if(pStrand.willLikelySurvive){
    pAequorSurvivor.push(pStrand);
    i++;
  }
}



//TEST 

const strand1 = mockUpStrand()
const strand2 = mockUpStrand()
const strand = mockUpStrand();
const pStrand = pAequorFactory(1, strand);
let pStrand1 = pAequorFactory(1, strand1);
let pStrand2 = pAequorFactory(1, strand2);

console.log(pStrand.mutate());

console.log(pStrand1.compareDNA(pStrand2));

console.log(pStrand.willLikelySurvive());
