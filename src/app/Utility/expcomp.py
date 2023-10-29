import re
import json

def main():
	phrases = [[], []]
	regex = [[], [], [], []]

	user_i = None
	path = "C:/Users/andre/Desktop/Code Projects/Website/iebdd2.github.io/Recipe_Book/src/app/recipe.json"

	with open(path, "r", encoding='utf-8') as input_f:
		recipe = json.load(input_f)

	for x in range(0, len(recipe["phrases"])):
		phrases[0].append(recipe["phrases"][x][0])
		phrases[1].append(recipe["phrases"][x][1])
		regex[-1].append(re.compile(r"\{" + str(x) + r"\}"))
		regex[0].append(re.compile(r"(?<=[ \}])" + re.escape(phrases[0][-1]) + "(?= |\\{|$|,)"))
		regex[1].append(re.compile(r"(?<=[ \}])" + re.escape(phrases[1][-1]) + "(?= |\\{|$|,)"))
	while(user_i == None):
		try:
			user_i = eval(input("Would you like to [e]xpand or [c]ompress? "), {}, {"e": 1, "expand": 1,  "c": 0, "compress": 0})
		except NameError:
			print("Unknown input.")
			continue
	if user_i == 0:
		recipe = compress(phrases, recipe, regex)
	elif user_i == 1:
		recipe = expand(phrases, recipe, regex)

	with open(path, "w", encoding='utf-8') as output_f:
		json.dump(recipe, output_f, ensure_ascii=False, indent=1)


def replace_str(pattern, repl, string):
	result = re.subn(pattern, repl, string)
	return result[0].split("{-1}"), result[1]

def expand(phrases, recipe, regex):
	replacements = 0
	new_repl = 0
	lang = None
	langs = ["de", "en", "fr"]
	keys = None
	while (lang == None):
		try:
			print("Which language would you like to expand to? Available languages:")
			for x in range(0, len(phrases)):
				print(langs[x])
			lang = eval(input(""), {}, {"de": 0, "en": 1, "fr": 2})
		except NameError:
			print("Unknown input.")
			continue
	for x in range(0, len(recipe["recipes"])):
		for y in range(0, len(phrases[lang])):
			keys = list(recipe["recipes"][x]["ingredients"].keys())
			for i in range(0, len(keys)):
				recipe["recipes"][x]["ingredients"][keys[i]], new_repl = replace_str(regex[-1][y], phrases[lang][y], '{-1}'.join(recipe["recipes"][x]["ingredients"][keys[i]]))
				replacements += new_repl
			recipe["recipes"][x]["overview"], new_repl = replace_str(regex[-1][y], phrases[lang][y], '{-1}'.join(recipe["recipes"][x]["overview"]))
			replacements += new_repl
	print(f'Made {replacements} replacements in file.')
	return recipe

def compress(phrases, recipe, regex):
	replacements = 0
	keys = None
	for x in range(0, len(recipe["recipes"])):
		for z in range(0, len(phrases)):
			for y in range(0, len(phrases[0])):
				keys = list(recipe["recipes"][x]["ingredients"].keys())
				for i in range(0, len(keys)):
					recipe["recipes"][x]["ingredients"][keys[i]], new_repl = replace_str(regex[z][y], "{" + str(y) + "}", '{-1}'.join(recipe["recipes"][x]["ingredients"][keys[i]]))
					replacements += new_repl
				recipe["recipes"][x]["overview"], new_repl = replace_str(regex[z][y], "{" + str(y) + "}", '{-1}'.join(recipe["recipes"][x]["overview"]))
				replacements += new_repl
	print(f'Made {replacements} replacements in file.')
	return recipe

if __name__ == "__main__":
	main()