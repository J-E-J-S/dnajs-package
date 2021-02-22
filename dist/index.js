class Seq{
    constructor(sequence){
        this.seq = sequence.toUpperCase();
        if(this.seq.match('[^CATG]')){
            throw new Error('Sequence is contaminated.')
        };
    };

    composition(){
        const bases = 'AGCTU';
        let comp = {}; // Base comprehension object

        // Loop through bases
        for(let i=0; i < bases.length; i++){
            let re = new RegExp(bases[i], 'g'); // Have to use this styling if want variable regex
            comp[bases[i]] = (this.seq.match(re) || []).length // Find count in sequence
        };

        // Decipher if RNA or DNA and drop respective U/T
        if (comp['U'] === 0){
            delete comp['U']
        };
        if (comp['T'] === 0){
            delete comp['T']
        };

        return comp
    };

    transcribe(){
        return this.seq.replace(/T/g, 'U');
    }
}
