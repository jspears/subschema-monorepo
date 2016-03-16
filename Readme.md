Subschema Devel
===
This project is here to make developing subschema itself more convienent.   

While most of the time, we write tests in subschema/test, it is often useful
to test things in the demo.   In this case you should use this.

I try to make writing subschema apps easy, I haven't tried so hard to make
writing subschema easy, this project is an attempt to fix this.


#Requirements
* NPM >3 - There are known issues with npm2 and babel. 
```sh
  $ sudo npm install npm@latest -g
```
* node > 4 - Seems to be fine on node 4 and up.

#Installation
```sh
  $ git clone --recursive git@github.com:subschema/subschema-devel.git
  $ cd subschema-devel
  $ bash install.sh
  $ cd subschema-demo
  $ npm run hot
```

#Publishing
This cleans all the modules, installs them, runs publish and then gh-pages to publish
demos.  It takes a few minutes.  

```sh
  $ ./publish.sh <VERSION>

```

##Notes to self.
* git push per submodule, git commit in subschema-devel.
* make sure remotes are up to date.
* 