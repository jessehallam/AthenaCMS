using System.IO;
using System.Linq;
using System.Text;

namespace Athena.Core.Media.File
{
    internal static class FileMediaHelpers
    {
        public static string MakeSafeFileName(string fileName)
        {
            var invalidFilenameChars = Path.GetInvalidFileNameChars().ToDictionary(c => c, c => true);
            var strBuilder = new StringBuilder(fileName.Length);

            foreach (var ch in fileName)
            {
                if (invalidFilenameChars.ContainsKey(ch)) continue;
                strBuilder.Append(ch);
            }

            return strBuilder.ToString();
        }
    }
}