Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile('E:\Diwrapp\diwrapp\public\assets\test_text2.png')

$maxBlue = 0
$bestBlueColor = $null
$minLuma = 255
$bestDarkColor = $null

for ($x = 0; $x -lt $bmp.Width; $x++) {
    for ($y = 0; $y -lt $bmp.Height; $y++) {
        $c = $bmp.GetPixel($x, $y)
        # Check for blue button: High B, Low R
        if ($c.B -gt 180 -and $c.B -gt ($c.R + 80)) {
            if ($c.B -gt $maxBlue) {
                $maxBlue = $c.B
                $bestBlueColor = $c
            }
        }
        # Check for dark text
        $luma = [int](0.299 * $c.R + 0.587 * $c.G + 0.114 * $c.B)
        if ($luma -lt $minLuma) {
            $minLuma = $luma
            $bestDarkColor = $c
        }
    }
}

if ($bestBlueColor) {
    Write-Output ("Best Blue Color: #" + $bestBlueColor.R.ToString("X2") + $bestBlueColor.G.ToString("X2") + $bestBlueColor.B.ToString("X2"))
}
if ($bestDarkColor) {
    Write-Output ("Best Dark Text: #" + $bestDarkColor.R.ToString("X2") + $bestDarkColor.G.ToString("X2") + $bestDarkColor.B.ToString("X2"))
}

$bmp.Dispose()
