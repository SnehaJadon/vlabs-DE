from PIL import Image
import shutil
import os

def convert_and_compress(
    file_path: str,
    output_folder: str,
    filename: str,
    keywordsList: list[str],
    excludeKeywordsList: list[str],
    convertedAndCompressedImageList: list[str],
    quality: int = 85,
    background=(255, 255, 255)
) -> bool:
    """
    Convert a single PNG/JPG image into compressed JPG if keywords match.
    """
    if not filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        return False

    # ✅ check both filename AND full path for keywords
    check_string = filename.lower() + " " + file_path.lower()

    if (any(keyword.lower() in check_string for keyword in keywordsList)
        and not any(keyword.lower() in check_string for keyword in excludeKeywordsList)):

        try:
            img = Image.open(file_path)

            # Handle transparency
            if img.mode in ("RGBA", "LA"):
                bg = Image.new("RGB", img.size, background)
                bg.paste(img, mask=img.split()[-1])
                img = bg
            else:
                img = img.convert("RGB")

            # Save as JPG
            out_name = os.path.splitext(filename)[0] + ".jpg"
            out_path = os.path.join(output_folder, out_name)
            img.save(out_path, "JPEG", quality=quality, optimize=True)
            img.close()

            print(f"✅ Converted and compressed: {filename} → {out_name}")
            convertedAndCompressedImageList.append(filename)
            return True

        except Exception as e:
            print(f"❌ Error processing {filename}: {e}")
            return False

    return False


def compress_images(source_folder, destination_folder, keywordsList, excludeKeywordsList, quality=70):
    os.makedirs(destination_folder, exist_ok=True)

    pngImageList, jpgImageList, errImageList, fileListLooped, convertedAndCompressedImageList = [], [], [], [], []

    imageListFound = os.listdir(source_folder)
    print("Total Images Found:", len(imageListFound))

    for filename in imageListFound:
        input_path = os.path.join(source_folder, filename)
        output_path = os.path.join(destination_folder, filename)

        if filename.lower().endswith((".png", ".jpg", ".jpeg")):
            fileListLooped.append(filename)

            if convert_and_compress(input_path, destination_folder, filename,
                                    keywordsList, excludeKeywordsList,
                                    convertedAndCompressedImageList, quality):
                continue

            try:
                img = Image.open(input_path)

                if img.format == "PNG":
                    img.save(output_path, format="PNG", optimize=True, compress_level=9)
                    pngImageList.append(filename)
                else:
                    img.save(output_path, format="JPEG", optimize=True, quality=quality)
                    jpgImageList.append(filename)

                img.close()
                print(f"Compressed: {filename} -> {output_path}")

            except Exception as e:
                print(f"Error compressing {filename}: {e}")
                shutil.copy2(input_path, output_path)
                errImageList.append(filename)
                print(f"[ERR but COPY] {filename}")
        else:
            shutil.copy2(input_path, output_path)
            fileListLooped.append(filename)
            print(f"[COPY] {filename}")

    return (len(imageListFound), pngImageList, jpgImageList, errImageList, fileListLooped, convertedAndCompressedImageList)


def printTheDiff(totalFoundImages, imageListLooped):
    return [img for img in totalFoundImages if img not in imageListLooped]


if __name__ == "__main__":
    expName = "DE4"
    keywordsList = ["small_map_location", "rover_gcp_setup", "rover_setup_phone_display", "controller_scr"]
    excludeKeywordsList = ["rover_setup_phone_display_0.png"]
    
    source = expName + "/src/images/step"
    destination = expName + "/src/images/step_output"
    totalImgs, pngs, jpgs, errs, imageListLooped, convertedAndCompressedImageList = compress_images(source, destination, keywordsList, excludeKeywordsList, quality=45)

    print("\n\n--------- Details ------------")
    print("Total Found Images:", totalImgs)
    print("PNG:", len(pngs), "\nJPG:", len(jpgs), "\nCONVERTED COMP: ", len(convertedAndCompressedImageList), "\nERR:", len(errs))

    notMatched = printTheDiff(os.listdir(source), imageListLooped)
    print("Images Found but Not Processed:", notMatched if notMatched else "None 🎉")
