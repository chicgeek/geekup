function order(jobs) {
    if (!jobs) {
        return '';
    }
    else {
        var orderedjobs = '';

        jobs = splitomatic(jobs);

        while (jobs.length) {
            
            var unorderedjobs = [];

            for (i = 0; i < jobs.length; i++) {
                var deps = jobs[i][2];
                if (!deps) {
                    orderedjobs += jobs[i][0];
                } 
                else {
                    if (isready(orderedjobs, deps)) {
                        orderedjobs += jobs[i][0];
                    } 
                    else {
                        unorderedjobs.push(jobs[i]);
                    }
                }
            }
            jobs = unorderedjobs;
        }

        return orderedjobs;
    }
}

function splitomatic(stuff) {
    var result = [];
    var lines = stuff.split('\n');
    for (var i = 0; i < lines.length; i++) {
        result.push(lines[i].split(' '));
    }
    return result;
}

function isready(orderedjobs, deps) {

    for (j = 0; j < deps.length; j++) {
        if (orderedjobs.indexOf(deps[j]) == -1) {
            return false;
        }
    }
    return true;
    
}

var jobs = 'a => \nb => d\nc => \nd => a\ne => c\nf => c';

console.log(order(jobs));
