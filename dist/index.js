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
    };

    reverse_complement(){

        const bases = 'AGCT';
        const mirror_bases = 'TCGA';

        let complement = ''; // Holds growing complement strand
        // Go through input seq and match to complement base
        for(let i=0; i < this.seq.length; i++){
            let base_index = bases.indexOf(this.seq[i]); // Find index in bases of input base
            complement += mirror_bases[base_index]; // Add the mirrored base to growing string
        };

        const reverse = complement.split('').reverse().join(''); // String reversal in js
        return reverse;
    };

    gc_content(){
        const gc = this.seq.match(/[GC]/g || []).length; // Count all GC bases
        const content = (gc / this.seq.length) * 100;

        return content
    };
}
