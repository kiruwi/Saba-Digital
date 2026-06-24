from pathlib import Path
from shutil import copyfile
from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_ROOT = ROOT / "public" / "images" / "optimized"

public_font_root = ROOT / "public" / "font"
public_font_root.mkdir(parents=True, exist_ok=True)
copyfile(
    ROOT / "src" / "font" / "Satoshi" / "Satoshi-Variable.woff2",
    public_font_root / "Satoshi-Variable.woff2",
)


def save_webp(image: Image.Image, destination: Path, quality: int = 78) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    image.save(destination, "WEBP", quality=quality, method=6)


def resize_square(
    source: Path,
    destination: Path,
    size: int,
    preserve_alpha: bool = False,
) -> None:
    with Image.open(source) as image:
        mode = "RGBA" if preserve_alpha else "RGB"
        image = ImageOps.fit(image.convert(mode), (size, size), Image.Resampling.LANCZOS)
        save_webp(image, destination)


def resize_contain(source: Path, destination: Path, canvas_size: tuple[int, int]) -> None:
    with Image.open(source) as image:
        image = image.convert("RGBA")
        image.thumbnail(canvas_size, Image.Resampling.LANCZOS)
        canvas = Image.new("RGBA", canvas_size, (0, 0, 0, 0))
        left = (canvas_size[0] - image.width) // 2
        top = (canvas_size[1] - image.height) // 2
        canvas.alpha_composite(image, (left, top))
        save_webp(canvas, destination, quality=76)


portrait_source = ROOT / "src" / "images" / "me.webp"
for width in (480, 720, 960, 1200):
    resize_square(
        portrait_source,
        OUTPUT_ROOT / "portrait" / f"ian-{width}.webp",
        width,
        preserve_alpha=True,
    )

testimonial_sources = {
    "mark": ROOT / "src" / "images" / "testimonials" / "mark.jpg",
    "taita": ROOT / "src" / "images" / "testimonials" / "taita.jpeg",
    "kamau": ROOT / "src" / "images" / "testimonials" / "kamau.jpeg",
}
for name, source in testimonial_sources.items():
    resize_square(source, OUTPUT_ROOT / "testimonials" / f"{name}-160.webp", 160)

logo_sources = {
    "eve-on-safari": "Eve On Safari.webp",
    "fencooh-steel-works": "Fencooh Steel Works.png",
    "global-pathways-advisory": "Global Pathways Advisory.png",
    "joint-learning-network": "Joint Learning Network.png",
    "patamu": "logoPATAMU@2x.webp",
    "salama-boda": "Salama Boda.png",
    "silvershine-sacco": "Silvershine Sacco.png",
    "solar-freeze": "Solar Freeze.png",
    "solis-kenya": "Solis Kenya.png",
}
logo_root = ROOT / "public" / "images" / "company-logos"
for slug, filename in logo_sources.items():
    source = logo_root / filename
    resize_contain(source, OUTPUT_ROOT / "logos" / f"{slug}-180.webp", (180, 60))
    resize_contain(source, OUTPUT_ROOT / "logos" / f"{slug}-360.webp", (360, 120))
