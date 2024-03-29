// Current handle languages
const handleLanguages = {
	"javascript": /console.[^\s]+\([^\s]+\)?/g,
	"typescript": /console.[^\s]+\([^\s]+\)?/g,
	"c": /printf\([^\s]+\)?/g,
	"cpp": /printf\([^\s]+\)?/g,
	"csharp": /Console.[^\s]+\([^\s]+\)?/g,
	"java": /System.out.println\([^\s]+\)?/g,
	"php": /echo [^\s]+\)?/g,
	"python": /print\([^\s]+\)?/g,
	"ruby": /puts\([^\s]+\)?/g,
	"go": /fmt.Println\([^\s]+\)?/g,
	"rust": /println.?\([^\s]+\)?/g, 
	"perl": /print\([^\s]+\)?/g,
	"lua": /print\([^\s]+\)?/g,
	"fsharp": /printfn\([^\s]+\)?/g, 
	"kotlin": /println\([^\s]+\)?/g,
	"objective-c": /NSLog\([^\s]+\)?/g,
	"objective-cpp": /NSLog\([^\s]+\)?/g,
	"coffeescript": /console.log\([^\s]+\)?/g,
	"clojure": /println\([^\s]+\)?/g,
	"elixir": /IO.puts\([^\s]+\)?/g,
	"elm": /Debug.log\([^\s]+\)?/g,
	"groovy": /println\([^\s]+\)?/g,
	"haskell": /putStrLn\([^\s]+\)?/g,
	"julia": /println\([^\s]+\)?/g,
	"ocaml": /print_endline\([^\s]+\)?/g,
	"r": /print\([^\s]+\)?/g,
	"scala": /println\([^\s]+\)?/g,
	"swift": /print\([^\s]+\)?/g,
	"visual basic": /Debug.Print\([^\s]+\)?/g,
	"vbnet": /Console.WriteLine\([^\s]+\)?/g,
	"xquery": /trace\([^\s]+\)?/g,
	"solidity": /console.[^\s]+\([^\s]+\)?/g,
	"vue": /console.[^\s]+\([^\s]+\)?/g,
}

module.exports = { handleLanguages }
