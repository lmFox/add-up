OUTPUT_PATH = docs

all: $(OUTPUT_PATH)

$(OUTPUT_PATH): clean
	mkdir -p $(OUTPUT_PATH)
	cd app && npx ng build --output-path ../$(OUTPUT_PATH) --base-href /add-up/
	rm $(OUTPUT_PATH)/3rdpartylicenses.txt # <-- Transform generated output.
	mv $(OUTPUT_PATH)/browser/* $(OUTPUT_PATH)/
	rm -rf $(OUTPUT_PATH)/browser

.PHONY: clean
clean:
	rm -rf $(OUTPUT_PATH)
