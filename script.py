import re
test = " AGREEMENT is made this _____________day of ________ between __________M/s ______________, a Company registered under the Companies Act,____, and having its registered office at ___________ hereinafter referred to as `the Licensor' of the One Part and Mr. ._________________carrying on business of ­­­­­­­­­­­­________________ Hereinafter referred has `the Licensee' of the Other Part"

print(re.split(r"_+", test))

