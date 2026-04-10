This is a miniproject for me 
where i coded a url shortner logic in backend
   basically the thing is how it works?
   atfirst it take longurl and after getting  the long url it goes to the counter model document 
   int the document there is a property called sequence (every time a new call happens it increases so that every time user can get a new shortner code)
   after getting the seqeuence it runs a function which returns a 1-2 digit unique string after getting that string a new url model is created with long url and short url
   this is the main part 


   after the user again tries to fetch the link using the short code 
   it finds the long url and redirect it directly from the browser thanks
