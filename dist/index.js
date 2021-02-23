class Seq{
    constructor(sequence){
        this.seq = sequence.toUpperCase();
        if(this.seq.match('[^CATGU]')){
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

        const bases = 'AGCTU';
        const mirror_bases = 'TCGAA';

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

    translate(){
        // Generate list of all codons
        const bases = 'UCAG';
        let codons = [];
        for(let a=0; a < bases.length; a++){
            for(let b=0; b < bases.length; b++){
                for(let c=0; c < bases.length; c++){
                    let codon = bases[a] + bases[b] + bases[c];
                    codons.push(codon);
                };
            };
        };
        const amino_acids = 'FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG';

        // Translate
        let protein = '';
        for(let pos=0; pos < (this.seq.length); pos += 3 ){
            let codon = this.seq.slice(pos, pos+3);
            let residue = amino_acids[codons.indexOf(codon)];
            if(residue === undefined){
                protein += '-';
            } else{
                protein += residue;
            }
        }
        return protein;
    };
}
